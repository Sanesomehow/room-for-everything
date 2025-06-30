import { useState } from "react";
import logo from "../assets/logo/image-removebg-preview.png";
import { UploadForm } from "./UploadForm";
import type { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="max-w-screen overflow-hidden">
      <nav className="flex items-center px-2 justify-between">
        <div id="logo" className="max-w-40">
          <img src={logo} alt="Logo" />
        </div>

        <form className="max-w-md w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#15202B] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <div id="create-btn" className="flex justify-center py-6">
          <button
            type="button"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            onClick={() => setIsVisible(true)}
          >
            <span className="flex items-center gap-2">Create Post</span>
          </button>
        </div>
      </nav>

      {isVisible && (
        <UploadForm
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
