import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import Masonry from "@mui/lab/Masonry";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/slices/postsSlice";
import { Post } from "@/components/Post";
import type { RootState, AppDispatch } from "@/store";
import plusIcon from "../assets/plus-solid.svg";
import { UploadForm } from "@/components/UploadForm";
import { FilterComponent } from "@/components/FilterComponent";
import { ItemType } from "@/types";

export function Room() {
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.data);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const [selectedFilters, setSelectedFilters] = useState<ItemType[]>([]);

  useEffect(() => {
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
    dispatch(fetchPosts());
    return () => window.removeEventListener("resize", updateScreen);
  }, [dispatch]);

  // Filter posts based on selected filters
  const filteredPosts = useMemo(() => {
    if (selectedFilters.length === 0) {
      return posts; // Show all posts if no filters selected
    }

    return posts.filter((post) => {
      // Handle posts without type (treat as TEXT or LINK based on whether they have URL)
      const postType = post.type || (post.url ? ItemType.LINK : ItemType.TEXT);
      return selectedFilters.includes(postType);
    });
  }, [posts, selectedFilters]);

  return (
    <div className="bg-background flex flex-col">
      
      
      <div className="px-5 mb-6 flex justify-start">
        <FilterComponent 
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
        />
      </div>

      {loading ? (
        <p className="text-center p-4">Loading posts...</p>
      ) : (
        <div className="px-5 pb-5 flex justify-center">
          {screen == "desktop" && <Masonry columns={4} spacing={4}>
            {filteredPosts.map((p) => (
              <Post key={p.id} post={p} screen={screen} />
            ))}
          </Masonry>}
          {screen == "tablet" && <Masonry columns={3} spacing={4}>
            {filteredPosts.map((p) => (
              <Post key={p.id} post={p} screen={screen} />
            ))}
          </Masonry>}
          {screen == "mobile" && <Masonry columns={2} spacing={3}>
            {filteredPosts.map((p) => (
              <Post key={p.id} post={p} screen={screen} />
            ))}
          </Masonry>}
          {filteredPosts.length === 0 && selectedFilters.length > 0 && (
            <p className="text-center p-4 text-muted-foreground">
              No posts found matching the selected filters.
            </p>
          )}
        </div>
      )}
      
    </div>
  );
}

