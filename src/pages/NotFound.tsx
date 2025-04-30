import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-gray-400">404</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for.
          </p>
          
          <Button asChild size="lg" className="bg-medical-600 hover:bg-medical-700">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 BreastInsight. All rights reserved.</p>
          <p className="mt-2">This tool is for educational purposes only and should not replace professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
