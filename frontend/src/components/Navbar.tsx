import { Link } from "react-router-dom";
import logo from "../assets/logo/image-removebg-preview.png";

export function Navbar({onCreatePostClick, screen}: {onCreatePostClick: () => void, screen: string}) {

  return (
    <div className="max-w-screen overflow-hidden">
      <nav className="flex flex-col lg:flex-row items-center px-2 md:px-10">
        <div className="flex items-center justify-between h-18 w-full lg:w-auto px-5 lg:px-0">
          <div id="logo" className="max-w-30 md:max-w-40">
          <Link to="/">
            <img src={logo} alt="Logo" />
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
      
        <form className="max-w-xs mt-15 md:max-w-md w-full lg:mx-auto lg:mt-0">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#15202B] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
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

        <div id="create-btn" className="hidden lg:flex justify-center py-6">
          <button
            type="button"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            onClick={onCreatePostClick}
          >
            <span className="flex items-center gap-2">Create</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
