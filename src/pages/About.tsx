
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-medical-700 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              BreastInsight was created to harness the power of artificial intelligence to assist healthcare 
              professionals in the early detection of breast cancer. Our mission is to provide accurate, 
              accessible tools that can help identify potential cases of breast cancer at earlier stages, 
              leading to better outcomes for patients.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-medical-700 mb-4">The Technology</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our prediction models have been trained on the Wisconsin Breast Cancer Dataset, which contains 
              thousands of breast cancer biopsy results with various measurements and characteristics. The models 
              use machine learning algorithms to identify patterns associated with benign and malignant tumors.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For text-based prediction, we utilize a Random Forest classifier that analyzes tumor measurements 
              such as radius, texture, perimeter, and other characteristics. Our image-based prediction system 
              uses deep learning convolutional neural networks to analyze mammogram and ultrasound images.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-medical-700 mb-4">Using Our Tool</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              BreastInsight offers two main prediction methods:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-2">Text-based Prediction</h3>
                <p className="text-gray-600 text-sm">
                  Enter numerical measurements from diagnostic tests to get a prediction based on tumor characteristics.
                  This method is ideal when you already have biopsy or diagnostic measurement results.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg mb-2">Image-based Prediction</h3>
                <p className="text-gray-600 text-sm">
                  Upload mammogram or ultrasound images for our AI to analyze. The system looks for visual patterns 
                  and abnormalities that may indicate malignancy.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              For the best results, we recommend using high-quality inputs. For measurements, ensure they are 
              accurate and complete. For images, use clear, high-resolution medical images without compression artifacts.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-medical-700 mb-4">Important Disclaimer</h2>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
              <p className="text-orange-800">
                BreastInsight is intended for educational and research purposes only. This tool should not be used as a 
                substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified 
                healthcare providers regarding any medical conditions or concerns.
              </p>
              <p className="text-orange-800 mt-2">
                The predictions provided by this tool are not definitive medical diagnoses and should be verified by 
                proper medical procedures and professionals.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-medical-700 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions, feedback, or more information about Breast_Cancer_Detection, please contact us at 
              <a href="mailto:info@breastinsight.example" className="text-medical-600 hover:underline ml-1">
                jeeka1469@gmail.com
              </a>.
            </p>
          </section>
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

export default About;
