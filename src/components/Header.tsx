
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-600 to-medical-400 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">BC</span>
            </div>
            <span className="text-xl font-bold text-gray-800">BreastInsight</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-medical-600 font-medium">
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center text-gray-700 hover:text-medical-600 font-medium">
                Features <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/text-based" className="cursor-pointer w-full">
                  Text-based Prediction
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/image-based" className="cursor-pointer w-full">
                  Image-based Prediction
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/about" className="text-gray-700 hover:text-medical-600 font-medium">
            About
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-medical-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 bg-white border-t">
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-medical-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/text-based"
            className="block py-2 text-gray-700 hover:text-medical-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Text-based Prediction
          </Link>
          <Link
            to="/image-based"
            className="block py-2 text-gray-700 hover:text-medical-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Image-based Prediction
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-medical-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
