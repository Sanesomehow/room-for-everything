//import { fetchPosts } from "@/slices/postsSlice";
import axios from "axios";
import { Link } from "react-router-dom";
//import type { AppDispatch } from "@/store";
//import { useDispatch } from "react-redux";
import { ItemType } from "@/types";
import { InstagramEmbed,
  TwitterEmbed,
  YoutubeEmbed,
  PinterestEmbed,
  LinkedinEmbed } from "./SocialEmbed";
import usePostStore from "@/store";

export function Post({ post, screen }: { post: any; screen: string }) {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const previewData = post.previewData;
  //const dispatch: AppDispatch = useDispatch();
  const { fetchPosts } = usePostStore();
  // let width;
  // let height;
  // if (screen == "mobile") {
  //   width = 175;
  //   height = 100;
  // } else if (screen == "tablet") {
  //   width = 300;
  //   height = 170;
  // } else {
  //   width = 300;
  //   height = 170;
  // }

  const handleClick = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${backend}/api/posts/${post.id}`);
      console.log(response);
    } catch (error) {
      console.error("Failed to delete post: ", error);
    } finally {
      fetchPosts();
    }
  };

  return (
    <article className="group relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className={`absolute top-2 right-2 z-20 p-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-all duration-200 hover:scale-110 shadow-lg hover:cursor-pointer
          ${
            screen == "mobile"
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        aria-label="Delete post"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H7a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      {post.type === ItemType.TWITTER && (
        <div
          className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => handleClick(post.url)}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          {/* <XCustomComponent url={post.url} /> */}
          <TwitterEmbed data={previewData} />
        </div>
      )}

      {post.type === ItemType.INSTAGRAM && (
        <div
          className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => handleClick(previewData.url)}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <InstagramEmbed data={previewData} />
        </div>
      )}

      {post.type === ItemType.YOUTUBE && (
        <div
          className="bg-[#15202B] border border-border/60 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]"
          onClick={() => handleClick(previewData.url)}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <YoutubeEmbed data={previewData} />
        </div>
      )}
      {post.type === ItemType.PINTEREST && (
        <div
          className="bg-[#15202B] border border-border/60 rounded-2xl flex items-center justify-center  cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]"
          onClick={() => handleClick(previewData.url)}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <PinterestEmbed data={previewData} />
        </div>
      )}
      {post.type === ItemType.LINKEDIN && (
        <div
          className="bg-[#15202B] border border-border/60 rounded-2xl flex items-center justify-center py-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]"
          onClick={() => handleClick(previewData.url)}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <LinkedinEmbed data={previewData} />
        </div>
      )}
      {(!post.type || post.type === ItemType.LINK) && post.url && (
        <div
          className="bg-[#15202B] backdrop-blur-sm border border-border/60 p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]"
          onClick={() => handleClick(post.url)}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10 space-y-2 md:space-y-3 flex flex-col">
            <div className="flex items-start justify-between gap-2 md:gap-3">
              <h3 className="text-xs md:text-xl font-normal md:font-bold text-foreground line-clamp-1 md:line-clamp-2 group-hover:text-primary transition-colors duration-200 flex-1 font-bitter">
                {previewData.title}
              </h3>
              {/* <div className="flex-shrink-0 p-2 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors duration-200 translate-x-3 -translate-y-3">
                <svg 
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div> */}
            </div>

            {previewData.description && (
              <p className="text-[9px] md:text-sm  text-muted-foreground line-clamp-2 md:line-clamp-3 leading-[1] md:leading-relaxed font-raleway">
                {previewData.description}
              </p>
            )}

            {previewData.image && (
              <div className="relative mt-3 md:mt-5 overflow-hidden rounded-xl bg-muted/20">
                <img
                  src={previewData.image}
                  alt={previewData.title || "Preview"}
                  className="w-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
          </div>
        </div>
      )}
      {(!post.type || post.type === ItemType.TEXT) && !post.url && (
        <Link to={`/posts/${post.id}`}>
          <div className="bg-[#15202B] backdrop-blur-sm border border-border/60 p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="space-y-2 md:space-y-4 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm md:text-lg lg:text-xl font-normal md:font-bold text-foreground leading-relaxed font-bitter">
                  {post.title}
                </h3>
                {/* <div className="flex-shrink-0 p-1 md:p-2 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors duration-200 translate-x-4 -translate-y-4">
                <svg 
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div> */}
              </div>

              <div className="text-[12px] font-light md:font-normal md:text-sm text-muted-foreground  md:leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground font-raleway">
                {post.content}
              </div>
            </div>
          </div>
        </Link>
      )}
    </article>
  );
}
