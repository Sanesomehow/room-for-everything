import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import HomeIcon from "../assets/logo/image-removebg-preview.png";

export default function NotFound() {
  return (
    <div className="absolute w-screen h-screen bg-[#] flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <TypeAnimation
          sequence={["404, Page not found.", 1000]}
          wrapper="span"
          speed={50}
          //   style={{ fontSize: "2em", display: "" }}
          repeat={Infinity}
          className="text-3xl text-white/70 font-bitter"
        />
        <div className="flex items-center gap-2">
          <p className="text-xl text-white/40 font-raleway">Go Home </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="24"
            viewBox="0 0 50 24"
            className="text-white/60"
          >
            <path
              d="M2,12 Q10,10 20,12 T40,12 L35,7 M40,12 L35,17"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
          <Link to="/">
            <img
              src={HomeIcon}
              alt="Home"
              className="w-20 p-2 rounded-full bg-muted hover:bg-muted/40 transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
