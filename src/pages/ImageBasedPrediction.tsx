
import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ImageBasedPrediction = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Reset previous prediction
      setShowResult(false);
      setPrediction(null);
      
      // Check if it's an image
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG).",
          variant: "destructive",
        });
        return;
      }
      
      // Check size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setShowResult(false);
    
    // Simulate model prediction with a delay
    setTimeout(() => {
      // For demo purposes, randomly determine the prediction
      // In a real app, this would call a backend API
      const isMalignant = Math.random() > 0.5;
      setPrediction(isMalignant);
      setShowResult(true);
      setIsLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setSelectedImage(null);
    setPreview(null);
    setShowResult(false);
    setPrediction(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Image-based Prediction</h1>
        <p className="text-gray-600 mb-8">
          Upload a mammogram or ultrasound image for analysis.
        </p>
        
        <div className="grid md:grid-cols-7 gap-6">
          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Breast Image</CardTitle>
                <CardDescription>
                  Upload a high-quality mammogram or ultrasound image for best results.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
                    hover:bg-gray-50 transition-colors ${preview ? 'border-medical-300 bg-medical-50' : 'border-gray-300'}`}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  {preview ? (
                    <div className="space-y-4">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="max-h-80 max-w-full mx-auto rounded"
                      />
                      <p className="text-sm text-gray-500">
                        {selectedImage?.name} - {Math.round((selectedImage?.size || 0) / 1024)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 py-10">
                      <Upload className="h-10 w-10 mx-auto text-gray-400" />
                      <p className="text-gray-500">Click or drag and drop an image</p>
                      <p className="text-xs text-gray-400">
                        Supported formats: JPEG, PNG (max 5MB)
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Image Guidelines</h4>
                  <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1">
                    <li>Use high-quality images for better prediction accuracy</li>
                    <li>Ensure the image is well-lit and properly focused</li>
                    <li>For mammograms, include all relevant tissue areas</li>
                    <li>Remove any personal identifying information from the image</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                  Reset
                </Button>
                <Button 
                  onClick={handlePredict} 
                  disabled={!selectedImage || isLoading}
                  className="bg-medical-600 hover:bg-medical-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : "Analyze Image"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card className={`h-full ${showResult ? '' : 'opacity-70'}`}>
              <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
                <CardDescription>
                  The AI model's assessment of your uploaded image
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-6">
                {!showResult && (
                  <div className="text-center py-16">
                    <p className="text-gray-500">
                      {isLoading ? 'Analyzing image...' : 'Upload an image and click "Analyze Image" to see results'}
                    </p>
                    {isLoading && <Loader2 className="h-10 w-10 mx-auto mt-4 text-medical-500 animate-spin" />}
                  </div>
                )}
                
                {showResult && (
                  <div className="text-center py-8">
                    {prediction === false ? (
                      <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">Likely Benign</h2>
                        <p className="text-gray-600">
                          The AI analysis suggests this image shows characteristics
                          typically associated with benign (non-cancerous) tissue.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertCircle className="h-10 w-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-red-700 mb-2">Potentially Malignant</h2>
                        <p className="text-gray-600">
                          The AI analysis suggests this image shows characteristics
                          that may be associated with malignant (cancerous) tissue.
                        </p>
                      </>
                    )}
                    
                    <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <p className="text-sm text-amber-800">
                        <strong>Medical Disclaimer:</strong> This tool is for demonstration purposes only
                        and is not intended for clinical use. Always consult with healthcare professionals
                        for proper diagnosis and treatment.
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

export default ImageBasedPrediction;
