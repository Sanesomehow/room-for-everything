import { Tweet } from "react-tweet";

export function XCustomComponent({url}: {url: string}) {
    console.log("XCustomComponent received url:", url);
    
    if (!url || typeof url !== 'string') {
        console.error("Invalid URL provided to XCustomComponent:", url);
        return <div>Invalid Twitter URL</div>;
    }
    
    const id = url.split('status/')[1];
    console.log("Extracted Twitter ID:", id);
    
    if (!id) {
        console.error("Could not extract Twitter ID from URL:", url);
        return <div>Invalid Twitter URL format</div>;
    }
    
    return (
        <div data-theme="dark" className="max-h-100 md:max-h- overflow-y-auto overflow-x-hidden bg-[#15202B] hover:bg-[#1e2732] rounded-2xl flex justify-center px-5" >
            <Tweet id={id} />
        </div>
    );
}





import React from 'react';

interface TwitterEmbedProps {
  username: string;
  tweetId: string;
  content: string;
  date: string;
  profileImage?: string;
  className?: string;
}

const TwitterEmbed = ({previewData}:{previewData: any}) => {
  //const tweetUrl = `https://twitter.com/${username}/status/${tweetId}`;
  return ( <div></div>
    // <div className={`max-w-lg mx-auto bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    //   {/* Header */}
    //   <div className="flex items-center space-x-3 mb-3">
    //     {profileImage ? (
    //       <img 
    //         src={profileImage} 
    //         alt={`${username} profile`}
    //         className="w-10 h-10 rounded-full"
    //       />
    //     ) : (
    //       <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
    //         <span className="text-white text-sm font-semibold">
    //           {username.charAt(0).toUpperCase()}
    //         </span>
    //       </div>
    //     )}
    //     <div>
    //       <div className="font-semibold text-gray-900">{username}</div>
    //       <div className="text-gray-500 text-sm">@{username}</div>
    //     </div>
    //     <div className="ml-auto">
    //       <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
    //         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    //       </svg>
    //     </div>
    //   </div>

    //   {/* Tweet Content */}
    //   <div className="text-gray-900 mb-3 leading-relaxed">
    //     {content}
    //   </div>

    //   {/* Footer */}
    //   <div className="flex items-center justify-between text-gray-500 text-sm">
    //     <span>{date}</span>
    //     <a 
    //       href={tweetUrl}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-blue-500 hover:text-blue-600 hover:underline"
    //     >
    //       View on Twitter
    //     </a>
    //   </div>

    //   {/* Engagement buttons */}
    //   <div className="flex items-center justify-around mt-4 pt-3 border-t border-gray-100">
    //     <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
    //       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    //       </svg>
    //       <span className="text-sm">Reply</span>
    //     </button>
    //     <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors">
    //       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    //       </svg>
    //       <span className="text-sm">Retweet</span>
    //     </button>
    //     <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors">
    //       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    //       </svg>
    //       <span className="text-sm">Like</span>
    //     </button>
    //     <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
    //       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    //       </svg>
    //       <span className="text-sm">Share</span>
    //     </button>
    //   </div>
    // </div>
  );
};

export default TwitterEmbed;