import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import googleLogo from "../assets/icons8-google.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";

export default function Signup() {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const { signup, loading, error, clearError, isAuthenticated} = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/room');
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if(success) {
      navigate('/room')
    }
  };

  useEffect(() => {
    return () => clearError();
  }, [clearError])

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-background">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-gray-900 to-[#0F172A]">
        <div className="w-full max-w-md">
          <div className="w-full bg-[#15202B]/80 backdrop-blur-sm shadow-lg rounded-xl p-6 mb-6 border border-gray-700/50">
            <h1 className="text-2xl font-semibold text-white/90 mb-3 font-bitter">
              Just want to check things out?
            </h1>
            <p className="text-gray-300 mb-5 text-sm font-raleway">
              Try our demo account without registration
            </p>
            
            <button
              type="button"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mb-5 transition-colors duration-200 focus:outline-none"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
            
            <div className="mt-6">
              <p className="text-gray-400 text-sm font-raleway">
                By using a demo account, you'll be able to:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1 font-raleway">
                <li>Save your favorite content (Upto 10) ✔️</li>
                <li>Create and manage your own spaces(Upto 1) ✔️</li>
                <li>Collaborate with other users ❌</li>
                <li>Customize your experience ❌</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <form 
            className="bg-[#15202B] shadow-xl rounded-2xl px-8 pt-8 pb-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white/80 mb-2 font-bitter">Create an account</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6 font-raleway">Join our community today</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-raleway">
                  Must be at least 8 characters
                </p>
              </div>
              
              <Button 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white/80 font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-300"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : "Create Account"}
              </Button>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 font-raleway">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
