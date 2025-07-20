import pinterestLogo from '../assets/icons8-pinterest-logo.svg';
import youtubeIcon from "../assets/icons8-youtube.svg"

export function InstagramEmbed({ data }: { data: any }) {
    let image = data.image;
    let name = '';
    let username = '';

    try {
        if (data.title) {
            name = data.title.split(' on')[0] || '';
        }
        if (data.description) {
            const descParts = data.description.split(' on')[0] || '';
            if (descParts && typeof descParts === 'string') {
                const usernameParts = descParts.split(' - ');
                username = usernameParts.length > 1 ? usernameParts[1] : '';
            }
        }
    } catch (error) {
        console.warn('Error parsing Instagram embed data:', error);
    }

  return (
    <div className="bg-[#15202B] border border-border/60 hover:border-primary/30 rounded-xl px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 pb-4 sm:pb-8 md:pb-10 flex flex-col justify-between">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-3 md:mb-5">
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0,0,256,256"
          className="w-5 h-5"
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="none"
            strokeLinecap="butt"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
          >
            <path
              transform="scale(4,4)"
              d="M42.41406,7c8.041,0 14.58594,6.54108 14.58594,14.58008v20.83398c0,8.041 -6.54203,14.58594 -14.58203,14.58594h-20.83203c-8.041,0 -14.58594,-6.54203 -14.58594,-14.58203v-20.83203c0,-8.041 6.54108,-14.58594 14.58008,-14.58594z"
              id="strokeMainSVG"
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinejoin="round"
            ></path>
            <g
              transform="scale(4,4)"
              fill="#15202b"
              stroke="none"
              strokeWidth="1"
              strokeLinejoin="miter"
            >
              <path d="M21.58008,7c-8.039,0 -14.58008,6.54494 -14.58008,14.58594v20.83203c0,8.04 6.54494,14.58203 14.58594,14.58203h20.83203c8.04,0 14.58203,-6.54494 14.58203,-14.58594v-20.83398c0,-8.039 -6.54494,-14.58008 -14.58594,-14.58008zM47,15c1.104,0 2,0.896 2,2c0,1.104 -0.896,2 -2,2c-1.104,0 -2,-0.896 -2,-2c0,-1.104 0.896,-2 2,-2zM32,19c7.17,0 13,5.83 13,13c0,7.17 -5.831,13 -13,13c-7.17,0 -13,-5.831 -13,-13c0,-7.169 5.83,-13 13,-13zM32,23c-4.971,0 -9,4.029 -9,9c0,4.971 4.029,9 9,9c4.971,0 9,-4.029 9,-9c0,-4.971 -4.029,-9 -9,-9z"></path>
            </g>
          </g>
        </svg>
        <div className="mt-3">
            <p className="sm:ml-3 md:ml-5 text-[14px] md:text-base font-bitter">{name}</p>
            <p className="sm:ml-3 md:ml-5 text-muted-foreground text-[12px] md:text-sm font-light font-raleway">@{username}</p>
        </div>
      </div>
      <div className="h-50 sm:h-60 md:h-80 lg:h-90 overflow-hidden rounded-md">
        <img src={image} alt="" className="w-full h-full object-cover object-center" />
      </div>
    </div>
  );
}

export function LinkedinEmbed({ data }: { data: any }) {
  let image = data.image;
  let title = data.title;
  let description = data.description;
  let firstname = '';
  let lastname = '';

  try {
        if (data.url && typeof data.url === 'string') {
            const urlParts = data.url.split("_");
            if (urlParts.length > 0) {
                const name = urlParts[0];
                const nameParts = name.split("-");
                
                if (nameParts.length > 0) {
                    let firstPart = nameParts[0];
                    if (firstPart.includes("posts/")) {
                        firstPart = firstPart.split("posts/")[1] || '';
                    }
                    firstname = firstPart ? firstPart.charAt(0).toUpperCase() + firstPart.slice(1) : '';
                }
                
                if (nameParts.length > 1) {
                    lastname = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : '';
                }
            }
        }
    } catch (error) {
        console.warn('Error parsing LinkedIn embed data:', error);
    }

  return (
    <div className="w-full max-w-full relative md:pt-2 lg:pt-2 ">
      <div className="rounded-lg overflow-hidden  duration-300 px-4 md:px-5 lg:px-4 ">
        <div className="flex items-start flex-col md:flex-row mb-6 md:mb-0">
          <div className="pb-2 lg:pb-7">
            <svg
              className="w-6 h-6 text-[#E9E9E9]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </div>
          <p className="md:ml-2 lg:ml-5 text-[14px] font-normal md:text-sm font-bitter">{firstname} {lastname}</p>
        </div>

        <div className="">
          <p className="text-[10px] text-muted-foreground md:text-sm  mb-2 md:mb-4 line-clamp-3 font-raleway">
            {description || title}
          </p>

          {image && (
            <div className="mt-2 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={image}
                alt={title}
                className="w-full object-cover"
                style={{ maxHeight: "360px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PinterestEmbed({ data }: { data: any }) {
    let image = data.image;
    let title = data.title;
    //let description = data.description;

    return (
        <div className="w-full max-w-full relative px-4 md:px-4 lg:px-5 pt-4 md:pt-4 lg:pt-4 pb-2">

            <div className="rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">

                <div className="relative">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full object-cover opacity-80 max-h-100"
                        style={{ aspectRatio: '2/3' }}
                    />
                    

                        <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4">
                            <button className="bg-red-600 text-white lg:font-bold py-0.5 px-2 md:py-1 md:px-3 lg:py-2 lg:px-4 rounded-full text-[12px] lg:text-sm">
                                Save
                            </button>
                        </div>

                    
                    <div className="absolute md:top-2 md:left-1 lg:top-3 lg:left-3 top-2 left-1.5 rounded-full w-8 md:w-10 lg:w-full">
                        <img src={pinterestLogo} alt="" />
                    </div>
                </div>              
                
            </div>
            <div className="px-0 py-2 md:py-4">
                    <h3 className="font-medium text-white text-[12px] sm:text-sm md:text-sm line-clamp-2 text-gray-900 font-bitter">{title}</h3>
                    
                    {/* <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p> */}
                </div>
        </div>
    );
}


export const TwitterEmbed = ({ data }: { data: any }) => {
  const previewData = data;

  if (!previewData || !previewData.html) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500">
        <p>No Twitter embed data available</p>
      </div>
    );
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(previewData.html, "text/html");
  const quoteParagraph = doc.querySelector("blockquote p");
  const quoteText = quoteParagraph?.childNodes[0].nodeValue?.trim();
  let username = '';

  try {
        if (previewData.url && typeof previewData.url === 'string') {
            const url = new URL(previewData.url);
            const pathParts = url.pathname.split('/');
            username = pathParts.length > 1 ? pathParts[1] : '';
        }
    } catch (error) {
        console.warn('Error parsing Twitter embed URL:', error);
    }

  return (
    <div className="bg-[#15202B] border border-border/60 hover:border-primary/30 rounded-xl px-3 sm:px-4 md:px-4 pt-3 sm:pt-4 pb-6 sm:pb-8 md:pb-10 flex flex-col justify-between"
    >
      <div className="flex items-start md:items-center flex-col md:flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0,0,256,256"
          className="w-5 h-5 sm:w-5 sm:h-5 self-start md:self-center"
        >
          <g
            fill="#ffffff"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
          >
            <g transform="scale(5.12,5.12)">
              <path d="M50.0625,10.4375c-1.84766,0.82031 -3.82812,1.37109 -5.91016,1.62109c2.125,-1.27344 3.75781,-3.28906 4.52344,-5.6875c-1.98437,1.17578 -4.19141,2.03125 -6.53125,2.49219c-1.875,-2 -4.54687,-3.24609 -7.50391,-3.24609c-5.67969,0 -10.28516,4.60156 -10.28516,10.28125c0,0.80469 0.09375,1.58984 0.26953,2.34375c-8.54687,-0.42969 -16.12109,-4.52344 -21.19531,-10.74609c-0.88672,1.52344 -1.39062,3.28906 -1.39062,5.17187c0,3.56641 1.8125,6.71484 4.57422,8.5625c-1.6875,-0.05469 -3.27344,-0.51953 -4.66016,-1.28906c0,0.04297 0,0.08594 0,0.12891c0,4.98438 3.54688,9.13672 8.24609,10.08594c-0.85937,0.23438 -1.76953,0.35938 -2.70703,0.35938c-0.66406,0 -1.30859,-0.0625 -1.9375,-0.1875c1.3125,4.08203 5.10938,7.0625 9.60547,7.14453c-3.51562,2.75781 -7.94922,4.39844 -12.76953,4.39844c-0.83203,0 -1.64844,-0.04687 -2.44922,-0.14453c4.54687,2.92188 9.95312,4.62109 15.76172,4.62109c18.91406,0 29.25781,-15.66797 29.25781,-29.25391c0,-0.44531 -0.01172,-0.89453 -0.02734,-1.33203c2.00781,-1.44922 3.75,-3.26172 5.12891,-5.32422z"></path>
            </g>
          </g>
        </svg>
        <div className="mt-2">
          <p className=" md:ml-5 text-[14px] md:text-base font-bitter">{previewData.author_name}</p>
          <p className=" md:ml-5 text-muted-foreground text-[12px] md:text-sm font-light font-raleway">@{username}</p>
        </div>
      </div>
      <div>
        <p className=" text-[12px] md:text-sm font-normal text-white/80 pt-10 sm:pt-16 md:pt-20 line-clamp-4 font-raleway">{quoteText}</p>
      </div>
    </div>
  );
};


export function YoutubeEmbed({ data }: { data: any }) {
    let image = data.image;
    let title = data.title;
    let description = data.description;

    return (
        <div className="w-full max-w-full relative px-2.5 pt-3 pb-4 sm:px-2.5 sm:pt-3 sm:pb-4 md:px-3 md:pt-4 md:pb-4 lg:px-4 lg:pt-4 lg:pb-6">
            <div className="relative pt-[56.25%] w-full bg-black overflow-hidden rounded-md shadow-md">
                <img 
                    src={image} 
                    alt={title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-brightness-50 cursor-pointer">
                    <div className="w-16 h-11  flex items-center justify-center rounded-lg">
                        <img src={youtubeIcon} alt="" />
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 w-full h-10 px-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="text-white">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                            <div className="text-white text-xs">0:00 / 0:00</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-white">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                </svg>
                            </button>
                            <button className="text-white">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                                    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                                </svg>
                            </button>
                            <button className="text-white">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="mt-2">
                <h3 className="text-sm font-medium line-clamp-2 font-bitter">{title}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-1 font-raleway">{description}</p>
            </div>
        </div>
    );
}
