import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import googleLogo from "../assets/icons8-google.svg";
import { useState } from "react";
import axios from "axios";

export function Signup() {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const response = await axios.post(`${backend}/signup`, {
      name,
      email,
      password,
    });
    console.log(response);
  };
  const handleGoogleButton = async () => {
    try {
      setIsLoading(true);
      window.location.href = `${backend}/auth/google`;
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to redirect to Google auth");
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 pt-15 pb-8">
      <form
        className="w-full max-h-fit max-w-[320px] sm:max-w-[400px] md:max-w-[450px] shadow-lg px-4 sm:px-8 pt-6 sm:pt-10 pb-12 sm:pb-20 rounded-xl bg-white"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-xl font-semibold text-blue-500 pb-5">Sign Up</h3>
        <div className="grid gap-4 sm:gap-5">
          <div className="grid gap-2 sm:gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="sid"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2 sm:gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="sid@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2 sm:gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full mt-3 sm:mt-5 bg-blue-600 hover:bg-indigo-400 shadow-lg"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 my-4 sm:my-6">
          <hr className="border-gray-300" />
          <p className="text-gray-500 text-center text-sm sm:text-base">or</p>
          <hr className="border-gray-300" />
        </div>
        <div onClick={handleGoogleButton}>
          <Button
            className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg w-full border border-gray-200 rounded-lg relative overflow-visible hover:shadow-xl text-sm sm:text-base"
            style={{
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
            }}
            type="button"
            onClick={handleGoogleButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <img src={googleLogo} alt="" className="w-4 sm:w-5 mr-2" />
                <p>Sign up with Google</p>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
