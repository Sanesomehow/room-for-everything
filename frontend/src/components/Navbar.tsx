import { Link } from "react-router-dom";
import logo from "../assets/logo/image-removebg-preview.png";
import { Searchbar } from "./Searchbar";
import { useAuthStore } from "@/store";

export function Navbar({
  onCreatePostClick,
}: {
  onCreatePostClick: () => void;
  screen: string;
}) {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="max-w-screen">
      <nav className="flex flex-col lg:flex-row items-center pb-10 px-2 md:px-10 relative">
        <div className="flex items-center justify-between h-18 w-full lg:w-auto px-5 lg:px-0">
          <div id="logo" className="">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="max-w-15 md:max-w-20" />
            </Link>
          </div>

          <div id="create-btn" className="flex justify-center py-6 lg:hidden">
            <button
              type="button"
              className="flex justify-center h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 "
              onClick={onCreatePostClick}
            >
              <span className="flex items-center gap-2">Create</span>
            </button>
          </div>
        </div>

        <Searchbar />

        <div id="create-btn" className="hidden lg:flex justify-center py-6">
          <button
            type="button"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            onClick={onCreatePostClick}
          >
            <span className="flex items-center gap-2">Create</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={logout}
              className="bg-[#15202B] ml-4 flex items-center gap-2 px-5 py-3 text-red-300 hover:text-red-600 font-medium rounded-full hover:scale-110 hover:border-red-600 transition-all duration-450"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-200"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
