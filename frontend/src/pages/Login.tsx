import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Clipboard } from "flowbite-react";

export default function Login() {
  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCredVisible, setIsCredVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(`${backend}/login`, {
        email,
        password,
      }, {
        withCredentials: true
      });
      if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    }
      console.log(response);
    } catch (err) {
      //setError(err?.response?.data?.message || "Login failed. Please try again.");
      console.error("Login failed: ",err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-background">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-gray-900 to-[#0F172A]">
        <div className="w-full max-w-md">
          <div className="w-full bg-[#15202B]/80 backdrop-blur-sm shadow-lg rounded-xl p-6 mb-6 border border-gray-700/50">
            <h1 className="text-2xl font-semibold text-white/90 mb-3">
              Just want to take a glimpse?
            </h1>
            <p className="text-gray-300 mb-5 text-sm">
              Try our demo account without registration
            </p>
            <button
              type="button"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mb-5 transition-colors duration-200 focus:outline-none"
              onClick={() => setIsCredVisible(!isCredVisible)}
            >
              {isCredVisible ? "Hide Credentials" : "Show Demo Credentials"}
            </button>

            <div
              className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
                isCredVisible ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid w-full grid-cols-8 gap-2">
                <label htmlFor="trial-username" className="sr-only">
                  Email
                </label>
                <input
                  id="trial-username"
                  type="text"
                  className="col-span-6 block w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value="trial@theroom.com"
                  disabled
                  readOnly
                />
                <Clipboard
                  valueToCopy="trial@theroom.com"
                  label="Copy"
                  className="col-span-2"
                />
              </div>
              <div className="grid w-full grid-cols-8 gap-2">
                <label htmlFor="trial-password" className="sr-only">
                  Password
                </label>
                <input
                  id="trial-password"
                  type="password"
                  className="col-span-6 block w-full rounded-lg border border-gray-700 bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value="password@TheRoom"
                  disabled
                  readOnly
                />
                <Clipboard
                  valueToCopy="password@TheRoom"
                  label="Copy"
                  className="col-span-2"
                />
              </div>
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
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white/80 mb-2">
              Welcome back
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
              Sign in to your account
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </Label>
                  {/* <a href="#" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">Forgot password?</a> */}
                </div>
                <Input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white/80 font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
