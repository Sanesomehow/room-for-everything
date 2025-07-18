import { useEffect } from "react";
import Masonry from "@mui/lab/Masonry";
import { Post } from "@/components/Post";
import usePostStore, { useScreenStore } from "@/store";

export default function Room() {
  const {  loading, fetchPosts, filters, getFilteredPosts, searchQuery, getSearchResults } = usePostStore();
  const { screen } = useScreenStore();
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); 

  const filteredPosts = getFilteredPosts();
  const searchResults = getSearchResults();

  const getPostsToDisplay = () => {
    if(searchQuery.trim()) {
      if(filters.length > 0) {
        searchResults.filter(post => filters.includes(post.type));
      }
      return searchResults;
    } else {
      return filteredPosts;
    }
  }

  const postsToDisplay = getPostsToDisplay();

  return (
    <div className="bg-background flex flex-col">

      {loading ? (
        <p className="text-center p-4">Loading posts...</p>
      ) : (
        <div className="px-5 pb-5 flex justify-center">
          {(screen == "desktop" && postsToDisplay.length !== 0) && <Masonry columns={4} spacing={4}>
            {postsToDisplay.map((p) => (
              <Post key={p.id} post={p} screen={screen} />
            ))}
          </Masonry>}
          {(screen == "tablet" && postsToDisplay.length !== 0) && <Masonry columns={3} spacing={4}>
            {postsToDisplay.map((p) => (
              <Post key={p.id} post={p} screen={screen} />
            ))}
          </Masonry>}
          {(screen == "mobile" && postsToDisplay.length !== 0) && <Masonry columns={2} spacing={3}>
            {postsToDisplay.map((p) => (
              <Post key={p.id} post={p} screen={screen} />
            ))}
          </Masonry>}
          {postsToDisplay.length === 0 && filters.length > 0 && (
            <p className="text-center p-4 text-muted-foreground">
              No posts found matching the selected filters.
            </p>
          )}
        </div>
      )}
      
    </div>
  );
}

