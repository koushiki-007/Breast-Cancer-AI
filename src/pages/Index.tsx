
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, FileImage, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Early Detection Saves Lives
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            BreastInsight uses advanced AI to analyze breast cancer data and provide
            accurate predictions to support early detection and diagnosis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-medical-600 hover:bg-medical-700">
              <Link to="/text-based">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-medical-100 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Medical technology" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="text-medical-600 font-bold text-xl">95%</div>
              <div className="text-sm text-gray-600">Prediction Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Prediction Methods</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Text-based */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="text-medical-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Text-based Prediction</h3>
              <p className="text-gray-600 mb-6">
                Enter your diagnostic measurements to receive accurate predictions based on our 
                machine learning model trained on thousands of verified cases.
              </p>
              <Button asChild variant="outline">
                <Link to="/text-based">Try Text Prediction</Link>
              </Button>
            </div>
            
            {/* Image-based */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <FileImage className="text-medical-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">Image-based Prediction</h3>
              <p className="text-gray-600 mb-6">
                Upload mammogram or ultrasound images for our advanced image recognition 
                system to analyze and detect potential abnormalities.
              </p>
              <Button asChild variant="outline">
                <Link to="/image-based">Try Image Prediction</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BreastInsight?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-medical-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Accuracy</h3>
              <p className="text-gray-600">
                Our machine learning models have been trained and validated with extensive medical datasets.
              </p>
            </div>
            
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-medical-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple interface designed for healthcare professionals to quickly input data and receive predictions.
              </p>
            </div>
            
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-medical-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get immediate prediction results that can help inform clinical decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-600 to-medical-400 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">BC</span>
              </div>
              <span className="text-xl font-bold text-gray-800">BreastInsight</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <Link to="/" className="text-gray-600 hover:text-medical-600 mb-2 md:mb-0">
                Home
              </Link>
              <Link to="/text-based" className="text-gray-600 hover:text-medical-600 mb-2 md:mb-0">
                Text-based Prediction
              </Link>
              <Link to="/image-based" className="text-gray-600 hover:text-medical-600 mb-2 md:mb-0">
                Image-based Prediction
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-medical-600">
                About
              </Link>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 BreastInsight. All rights reserved.</p>
            <p className="mt-2">This tool is for educational purposes only and should not replace professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
