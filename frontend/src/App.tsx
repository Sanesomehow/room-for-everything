import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AuthCallback } from "./pages/AuthCallback";
import { Navbar } from "./components/Navbar";
import { UploadForm } from "./components/UploadForm";
import { LoadingAnimation } from "./components/LoadingAnimation";
import { Textpost } from "./pages/Textpost";
import { Homepage } from "./pages/Homepage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore, useScreenStore } from "./store";

const Room = lazy(() => import("./pages/Room"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
  const { screen, setScreen } = useScreenStore();
  const { initializeAuth } = useAuthStore(); 
  const location = useLocation();
  const routesWithNavbar = ["/room"];
  const shouldShowNavbar = routesWithNavbar.includes(location.pathname);

  useEffect(() => {
  initializeAuth();
}, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
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
  }, [setScreen]);

  return (
    <div id="App" className="bg-background min-h-screen max-w-screen">
      <main>
        <Suspense fallback={<LoadingAnimation />}>
          {shouldShowNavbar && (
            <Navbar
              onCreatePostClick={() => setIsUploadFormVisible(true)}
              screen={screen}
            />
          )}
          <Routes>
            <Route index element={<Homepage />} />
            <Route
              path="/room"
              element={
                <ProtectedRoute>
                  <Room />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/posts/:id"
              element={
                <ProtectedRoute>
                  <Textpost />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {isUploadFormVisible && (
        <UploadForm
          isVisible={isUploadFormVisible}
          setIsVisible={setIsUploadFormVisible}
          //dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
