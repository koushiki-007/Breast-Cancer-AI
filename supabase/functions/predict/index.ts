
// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create a Supabase client for the edge function
// @ts-ignore
const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://mkjznlobbilwfpavgbar.supabase.co';
// @ts-ignore
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ranpubG9iYmlsd2ZwYXZnYmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDk1NzksImV4cCI6MjA2MDkyNTU3OX0.mfoYK-LZNxJHBrphRsJ83jr-8nb5reK64-u59_BSJeI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Extensive environment and request logging
    console.log("Environment check:");
    console.log("SUPABASE_URL:", supabaseUrl);
    // @ts-ignore
    const pythonApiUrl = Deno.env.get('PYTHON_API_URL');
    console.log("PYTHON_API_URL:", pythonApiUrl);
    
    // Log incoming request details
    const requestBody = await req.json();
    console.log("Received request body:", JSON.stringify(requestBody, null, 2));

    const { features } = requestBody;

    // Validate input
    if (!features || typeof features !== "object") {
      console.error("Invalid features provided:", features);
      throw new Error("Invalid features provided");
    }

    // Required feature names
    const requiredFeatures = [
      'radius_mean',
      'texture_mean',
      'perimeter_mean',
      'area_mean',
      'smoothness_mean',
      'compactness_mean',
      'concavity_mean',
      'concave points_mean',
      'symmetry_mean',
      'fractal_dimension_mean'
    ];

    // Check if all required features are present
    for (const feature of requiredFeatures) {
      if (!(feature in features)) {
        console.error(`Missing required feature: ${feature}`);
        throw new Error(`Missing required feature: ${feature}`);
      }
    }

    // Map features to an array for model input (order matters)
    const featureArray = requiredFeatures.map(feature => features[feature]);
    console.log("Feature array for model:", featureArray);

    // Call Python API for prediction with retry logic
    try {
      if (!pythonApiUrl) {
        console.error("No PYTHON_API_URL configured");
        throw new Error("Python API URL not configured");
      }
      
      console.log(`Attempting to call Python API at: ${pythonApiUrl}`);
      
      // Prepare request body
      const apiRequestBody = {
        features: featureArray,
        modelBucket: "ai.model",
        modelFile: "breast_cancer_rf_model.pkl",
        scalerFile: "scaler.pkl",
      };
      
      console.log("Sending request to Python API:", JSON.stringify(apiRequestBody));
      
      // First attempt with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const apiRes = await fetch(pythonApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Log full API response for debugging
        const apiResponseText = await apiRes.text();
        console.log("Raw API Response:", apiResponseText);
        
        if (!apiRes.ok) {
          // If we get a 502 or 504, it might be that the Render service is waking up
          if (apiRes.status === 502 || apiRes.status === 504) {
            console.log("Received gateway error, service might be starting up. Using fallback prediction.");
            return createFallbackResponse("The prediction service is starting up. Please try again in a minute.", featureArray);
          }
          
          console.error(`Python API returned error ${apiRes.status}: ${apiResponseText}`);
          throw new Error(`Python API error: ${apiRes.status} ${apiRes.statusText}`);
        }
        
        // Parse the response
        let result;
        try {
          result = JSON.parse(apiResponseText);
        } catch (parseError) {
          console.error("Failed to parse API response:", parseError);
          throw new Error("Invalid response format from Python API");
        }
        
        console.log("Received prediction from Python API:", result);

        return new Response(
          JSON.stringify({
            prediction: result.prediction,
            probability: result.probability,
            isMock: result.isMock || false
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (timeoutError) {
        if (timeoutError.name === 'AbortError') {
          console.log("Request timed out, service might be starting up. Using fallback prediction.");
          return createFallbackResponse("The prediction service is starting up. Please try again in a minute.", featureArray);
        }
        throw timeoutError;
      }
    } catch (apiErr) {
      // Detailed error logging
      console.error("Error calling Python API:", apiErr);
      console.error("Stack trace:", apiErr.stack);
      
      // Fallback mock prediction with more context
      return createFallbackResponse(apiErr.message, featureArray);
    }
  } catch (error) {
    console.error("Overall prediction process error:", error);
    console.error("Stack trace:", error.stack);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: String(error)
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper function to create a fallback mock response
function createFallbackResponse(errorMessage: string, features: number[]) {
  // Generate a deterministic but "realistic" prediction based on the input features
  // This ensures consistent results for the same inputs during fallback mode
  const sum = features.reduce((a, b) => a + b, 0);
  const isMalignant = (sum % 100) > 50;  // Simple deterministic rule
  
  return new Response(
    JSON.stringify({
      prediction: isMalignant ? "Malignant" : "Benign",
      probability: isMalignant ? 0.85 : 0.78,
      error: errorMessage,
      isMock: true
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}