import { useEffect, useRef, useState } from "react";
import { ItemType } from "@/types";
import InstagramIcon from "../assets/icons8-instagram-50.png";
import LinkedInIcon from "../assets/icons8-linkedin-50.png";
import FacebookIcon from "../assets/icons8-facebook-50.png";
import PinterestIcon from "../assets/icons8-pinterest-50.png";
import TwitterIcon from "../assets/icons8-x-50.png";
import YoutubeIcon from "../assets/icons8-youtube-50.png";
import LinkIcon from "../assets/icons8-link-48.png";
import TextIcon from "../assets/icons8-text-50.png";

interface FilterComponentProps {
  selectedFilters: ItemType[];
  onFiltersChange: (filters: ItemType[]) => void;
}

export function FilterComponent({ selectedFilters, onFiltersChange }: FilterComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const DDref = useRef<HTMLDivElement>(null);
    const Bref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const closeDD = (e: MouseEvent) => {
            if (
                DDref.current &&
                !DDref.current.contains(e.target as Node) &&
                Bref.current &&
                !Bref.current.contains(e.target as Node)
            ) {
                setIsOpen(false);

            }
        };
        document.addEventListener("mousedown", closeDD);
        return () => {
            document.removeEventListener("mousedown", closeDD);
        };
    }, []);

    const handleCheckboxChange = (type: ItemType, checked: boolean) => {
        if (checked) {
            onFiltersChange([...selectedFilters, type]);
        } else {
            onFiltersChange(selectedFilters.filter(filter => filter !== type));
        }
    };

    const filterOptions = [
        { value: ItemType.TWITTER, label: "Twitter", icon: TwitterIcon },
        { value: ItemType.YOUTUBE, label: "Youtube", icon: YoutubeIcon },
        { value: ItemType.INSTAGRAM, label: "Instagram", icon: InstagramIcon },
        { value: ItemType.PINTEREST, label: "Pinterest", icon: PinterestIcon },
        { value: ItemType.FACEBOOK, label: "Facebook", icon: FacebookIcon },
        { value: ItemType.LINKEDIN, label: "LinkedIn", icon: LinkedInIcon },
        { value: ItemType.LINK, label: "URL", icon: LinkIcon },
        { value: ItemType.TEXT, label: "Text", icon: TextIcon },
    ];

    return (
        <div>
            <button
                id="dropdownBgHoverButton"
                data-dropdown-toggle="dropdownBgHover"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button" onClick={()=>{
                    setIsOpen(!isOpen);
                }}
                ref={Bref}
            >
                Filter by Type{selectedFilters.length > 0 && ` (${selectedFilters.length})`}
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdownBgHover"
                    className="z-10 absolute mt-3 w-48 bg-white rounded-lg shadow-sm dark:bg-gray-700"
                    ref={DDref}
                >
                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                        {filterOptions.map((option, index) => (
                            <li key={option.value}>
                                <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        id={`checkbox-item-${index + 1}`}
                                        type="checkbox"
                                        value={option.value}
                                        checked={selectedFilters.includes(option.value)}
                                        onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor={`checkbox-item-${index + 1}`}
                                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                    >
                                        {option.label}
                                    </label>
                                    <img src={option.icon} alt="" className="w-5" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
