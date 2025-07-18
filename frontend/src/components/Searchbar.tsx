import { ItemType } from "@/types";
import InstagramIcon from "../assets/icons8-instagram-50.png";
import LinkedInIcon from "../assets/icons8-linkedin-50.png";
import PinterestIcon from "../assets/icons8-pinterest-50.png";
import TwitterIcon from "../assets/icons8-x-50.png";
import YoutubeIcon from "../assets/icons8-youtube-50.png";
import LinkIcon from "../assets/icons8-link-48.png";
import TextIcon from "../assets/icons8-text-50.png";
import usePostStore from "@/store";
import React, { useRef, useState, useEffect } from "react";

export function Searchbar() {
  const filterOptions = [
    { value: ItemType.TWITTER, label: "Twitter", icon: TwitterIcon },
    { value: ItemType.YOUTUBE, label: "Youtube", icon: YoutubeIcon },
    { value: ItemType.INSTAGRAM, label: "Instagram", icon: InstagramIcon },
    { value: ItemType.PINTEREST, label: "Pinterest", icon: PinterestIcon },
    { value: ItemType.LINKEDIN, label: "LinkedIn", icon: LinkedInIcon },
    { value: ItemType.LINK, label: "URL", icon: LinkIcon },
    { value: ItemType.TEXT, label: "Text", icon: TextIcon },
  ];

  const { filters, setFilters, clearSearchResults } = usePostStore();
  const [isOpen, setIsOpen] = useState(false);
  const DDref = useRef<HTMLDivElement>(null);
  const Bref = useRef<HTMLButtonElement>(null);

  const handleCheckboxChange = (type: ItemType, checked: boolean) => {
    if (checked) {
      setFilters([...filters, type]);
    } else {
      setFilters(filters.filter((filter) => filter !== type));
    }
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { searchPosts } = usePostStore();

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if(debouncedSearchQuery.trimEnd()) {
        searchPosts(debouncedSearchQuery);
    } else {
        clearSearchResults()
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        DDref.current &&
        !DDref.current.contains(event.target as Node) &&
        Bref.current &&
        !Bref.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [debouncedSearchQuery, searchPosts]);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchPosts(searchQuery);
  };

  return (
    <div className="max-w-xs mt-15 md:max-w-md lg:max-w-lg w-full lg:mx-auto lg:mt-0 relative">
      <form
      onSubmit={search}>
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="flex relative">
          <button
            id="dropdown-button"
            className="shrink-0 z-10 inline-flex items-center py-2 px-4 md:py-4 md:px-4 text-xs md:text-sm font-medium text-center text-gray-700 bg-gray-50 border border-gray-300 rounded-s-xl hover:bg-gray-100  focus:outline-none  dark:bg-[#15202B] dark:hover:bg-gray-600  dark:text-white dark:border-gray-600 transition-all duration-200"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            ref={Bref}
          >
            <svg
              className="w-4 h-4 mr-2 hidden md:inline"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filters {filters.length > 0 && `(${filters.length})`}
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div className="relative w-full">
            <input
              type="text"
              id="search-dropdown"
              className="block w-full p-2 md:p-4 text-sm text-gray-900 border border-gray-300 rounded-e-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#15202B] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-1 bottom-1 md:end-2.5 md:bottom-2.5  focus:outline-none  font-medium rounded-lg text-sm px-2 py-2 md:px-4 md:py-2 transition-colors duration-150"
            >
              <svg
                className="w-4 h-4"
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
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {isOpen && (
        <div
          className="z-[9999] absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 dark:bg-[#15202B] dark:border-gray-700 overflow-hidden"
          ref={DDref}
        >
          <div className=" p-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                Filter by Platform
              </h3>
              <button
                onClick={clearAllFilters}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-all duration-200 ${
                  filters.length > 0
                    ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                    : " text-gray-400 cursor-not-allowed dark:text-gray-500"
                }`}
                disabled={filters.length === 0}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="p-3 max-h-72 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.map((option) => (
                <label
                  key={option.value}
                  htmlFor={`filter-${option.value}`}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200  ${
                    filters.includes(option.value)
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700"
                      : " border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="relative">
                    <input
                      id={`filter-${option.value}`}
                      type="checkbox"
                      value={option.value}
                      checked={filters.includes(option.value)}
                      onChange={(e) =>
                        handleCheckboxChange(option.value, e.target.checked)
                      }
                      className="sr-only"
                    />
                    <div
                    //   className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    //     filters.includes(option.value)
                    //       ? "bg-blue-600 border-blue-600"
                    //       : "border-gray-300 dark:border-gray-500"
                    //   }`}
                    >
                      {filters.includes(option.value) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium truncate ${
                          filters.includes(option.value)
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {option.label}
                      </span>
                      <img
                        src={option.icon}
                        alt={option.label}
                        className="w-6 h-6 ml-2 rounded-md"
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 text-center border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {filters.length > 0
                ? `${filters.length} filter${
                    filters.length > 1 ? "s" : ""
                  } selected`
                : "Select platforms to filter content"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
