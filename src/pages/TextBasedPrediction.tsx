import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// List of selected features - same as in the Python code
const selectedFeatures = [
  'radius_mean',
  'texture_mean',
  'perimeter_mean',
  'area_mean',
  'smoothness_mean',
  'compactness_mean',
  'concavity_mean',
  'concave points_mean',
  'symmetry_mean',
  'fractal_dimension_mean',
];

// Feature descriptions and ranges for better user understanding
const featureInfo = {
  'radius_mean': {
    description: 'Mean radius of the tumor',
    min: 6.0,
    max: 28.0,
    step: 0.1,
    default: 14.0,
  },
  'texture_mean': {
    description: 'Mean texture of the tumor surface',
    min: 9.0,
    max: 40.0,
    step: 0.1,
    default: 19.0,
  },
  'perimeter_mean': {
    description: 'Mean perimeter of the tumor',
    min: 40.0,
    max: 190.0,
    step: 0.5,
    default: 92.0,
  },
  'area_mean': {
    description: 'Mean area of the tumor',
    min: 140.0,
    max: 2500.0,
    step: 10.0,
    default: 650.0,
  },
  'smoothness_mean': {
    description: 'Mean smoothness of the tumor surface',
    min: 0.05,
    max: 0.16,
    step: 0.001,
    default: 0.096,
  },
  'compactness_mean': {
    description: 'Mean compactness of the tumor',
    min: 0.02,
    max: 0.35,
    step: 0.001,
    default: 0.104,
  },
  'concavity_mean': {
    description: 'Mean concavity of the tumor',
    min: 0.0,
    max: 0.43,
    step: 0.001,
    default: 0.089,
  },
  'concave points_mean': {
    description: 'Mean number of concave points in the tumor',
    min: 0.0,
    max: 0.2,
    step: 0.001,
    default: 0.049,
  },
  'symmetry_mean': {
    description: 'Mean symmetry of the tumor',
    min: 0.1,
    max: 0.3,
    step: 0.001,
    default: 0.182,
  },
  'fractal_dimension_mean': {
    description: 'Mean fractal dimension of the tumor',
    min: 0.05,
    max: 0.1,
    step: 0.001,
    default: 0.063,
  },
};

const TextBasedPrediction = () => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<Record<string, number>>(() => {
    // Initialize with default values
    const defaults: Record<string, number> = {};
    selectedFeatures.forEach(feature => {
      defaults[feature] = featureInfo[feature as keyof typeof featureInfo].default;
    });
    return defaults;
  });
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [probability, setProbability] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isMockPrediction, setIsMockPrediction] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSliderChange = (feature: string, value: number[]) => {
    setFormValues(prev => ({
      ...prev,
      [feature]: value[0],
    }));
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    setShowResult(false);
    setError(null);
    setIsMockPrediction(false);
    
    try {
      // Call the Supabase Edge Function for prediction
      const { data, error: supabaseError } = await supabase.functions.invoke('predict', {
        body: { features: formValues }
      });

      if (supabaseError) {
        console.error("Supabase function error:", supabaseError);
        throw new Error(supabaseError.message || 'Error making prediction');
      }

      if (!data) {
        throw new Error("No data returned from prediction");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data.prediction);
      setProbability(data.probability);
      setShowResult(true);
      
      // Check if we got a mock prediction
      if (data.isMock) {
        setIsMockPrediction(true);
        toast({
          title: "Using Demo Mode",
          description: "The prediction is a simulation. The AI model is currently unavailable.",
          variant: "default",
        });
      }

    } catch (error) {
      console.error('Prediction error:', error);
      setError(error instanceof Error ? error.message : "There was an error processing your request.");
      toast({
        title: "Prediction Error",
        description: error instanceof Error ? error.message : "There was an error processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const resetForm = () => {
    const defaults: Record<string, number> = {};
    selectedFeatures.forEach(feature => {
      defaults[feature] = featureInfo[feature as keyof typeof featureInfo].default;
    });
    setFormValues(defaults);
    setShowResult(false);
    setPrediction(null);
    setProbability(null);
    setError(null);
    setIsMockPrediction(false);
  };

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Text-based Prediction</h1>
        <p className="text-gray-600 mb-8">
          Enter the tumor characteristics below to predict if it's benign or malignant.
        </p>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {isMockPrediction && !error && (
          <Alert variant="default" className="mb-6 border-yellow-400 bg-yellow-50 text-yellow-800">
            <Info className="h-4 w-4 text-yellow-500" />
            <AlertTitle>Demo Mode Active</AlertTitle>
            <AlertDescription>
              The AI model is currently in demo mode. Predictions are simulated and should not be used for any real assessment.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-7 gap-6">
          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Input Tumor Characteristics</CardTitle>
                <CardDescription>
                  Drag the sliders to set values for each characteristic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedFeatures.map((feature) => {
                  const info = featureInfo[feature as keyof typeof featureInfo];
                  return (
                    <div key={feature} className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">
                          {feature.replace('_', ' ').replace('mean', '')}:
                        </label>
                        <span className="text-sm font-medium text-medical-700">
                          {formValues[feature].toFixed(3)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{info.min}</span>
                        <Slider
                          defaultValue={[info.default]}
                          min={info.min}
                          max={info.max}
                          step={info.step}
                          value={[formValues[feature]]}
                          onValueChange={(value) => handleSliderChange(feature, value)}
                          className="flex-1"
                        />
                        <span className="text-xs text-gray-500">{info.max}</span>
                      </div>
                      <p className="text-xs text-gray-500">{info.description}</p>
                    </div>
                  );
                })}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm}>Reset</Button>
                <Button 
                  onClick={handlePredict} 
                  disabled={isPredicting}
                  className="bg-medical-600 hover:bg-medical-700"
                >
                  {isPredicting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : "Predict"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card className={`h-full ${showResult ? '' : 'opacity-70'}`}>
              <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
                <CardDescription>
                  {isMockPrediction 
                    ? "Demo Mode: Simulated prediction based on input" 
                    : "The AI model's assessment based on provided data"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-6">
                {!showResult && !error && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {isPredicting ? 'Analyzing data...' : 'Fill in the form and click "Predict" to see results'}
                    </p>
                  </div>
                )}
                
                {showResult && (
                  <div className="text-center py-8">
                    {prediction === 'Benign' ? (
                      <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">Benign (B)</h2>
                        <p className="text-gray-600">
                          The tumor is likely benign (non-cancerous).
                        </p>
                        {probability !== null && (
                          <p className="text-sm text-gray-500 mt-2">
                            Confidence: {Math.round(probability * 100)}%
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertCircle className="h-10 w-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-red-700 mb-2">Malignant (M)</h2>
                        <p className="text-gray-600">
                          The tumor is likely malignant (cancerous).
                        </p>
                        {probability !== null && (
                          <p className="text-sm text-gray-500 mt-2">
                            Confidence: {Math.round(probability * 100)}%
                          </p>
                        )}
                      </>
                    )}
                    
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-800">
                        <strong>Important:</strong> This is a demonstration tool and should not be used for 
                        medical diagnosis. Always consult with healthcare professionals.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <footer className="mt-auto bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 BreastInsight. All rights reserved.</p>
          <p className="mt-2">This tool is for educational purposes only and should not replace professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default TextBasedPrediction;