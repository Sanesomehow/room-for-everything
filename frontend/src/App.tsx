import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthCallback } from "./pages/AuthCallback";
import { Room } from "./pages/Room";
import { Navbar } from "./components/Navbar";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    // Default to dark theme since Deep Space is inherently dark
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div id="App" className="bg-background min-h-screen min-w-screen">
      <Navbar />
      <main>
        <Suspense />
        <Routes>
          <Route index element={<Room />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
