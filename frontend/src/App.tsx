import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthCallback } from "./pages/AuthCallback";
import { Room } from "./pages/Room";
import { Navbar } from "./components/Navbar";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { UploadForm } from "./components/UploadForm";
import { NotFound } from "./components/NotFound";
import { LoadingAnimation } from "./components/LoadingAnimation";

function App() {
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // Default to dark theme since Deep Space is inherently dark
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    const updateScreen = () => {
      if (window.innerWidth < 768) {
        setScreen("mobile");
      } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        setScreen("tablet");
      } else {
        setScreen("desktop");
      }
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  return (
    <div id="App" className="bg-background min-h-screen max-w-screen">
      <Navbar onCreatePostClick={() => setIsUploadFormVisible(true)} screen={screen} />
      <main>
        <Suspense fallback={<LoadingAnimation />} />
        <Routes>
          <Route index element={<Room screen={screen} setScreen={setScreen} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

            {isUploadFormVisible && (
        <UploadForm
          isVisible={isUploadFormVisible}
          setIsVisible={setIsUploadFormVisible}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
