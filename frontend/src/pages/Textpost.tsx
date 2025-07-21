import usePostStore from "@/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function Textpost() {
  const navigate = useNavigate();
  const { id } = useParams();
  interface Post {
    id: number;
    title: string;
    text: string;
  }
  const [post, setPost] = useState<Post>({ id: NaN, title: "", text: "" });
  const [isLoading, setIsLoading] = useState(true);
  const { getPostsById } = usePostStore();
  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${backend}/api/posts/${post.id}`);
      //console.log(response);
    } catch (error) {
      console.error("Failed to delete post: ", error);
    } finally {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    const cachedPost = getPostsById(id);
    if (cachedPost) {
      setPost(cachedPost);
      console.log("cached");
      setIsLoading(false);
      return;
    }
    async function getPost() {
      try {
        const response = await axios.get(`${backend}/api/posts/${id}`);
        setPost(response.data.post);
        console.log("fetched");
      } catch (error) {
        console.log("Failed to get post: ", error);
      } finally {
        setIsLoading(false);
        console.log(id);
      }
    }
    getPost();
  }, []);

  return (
    <div className="min-h-screen bg-background backdrop-blur-xl flex flex-col p-5">
      <div className="w-full mb-5">
        <button
          className="flex items-center bg-[#15202B] hover:bg-[#1e2732] cursor-pointer rounded-full px-5 py-2 transition-all duration-300  hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]"
          onClick={() => navigate(-1)}
        >
          <span className="pr-2">🡠</span>
          <span>Back</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="relative w-full bg-[#15202B] rounded-lg p-10 max-w-2xl max-h-150 md:max-h-250 flex-1 flex flex-col">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="absolute top-4 right-4 z-20 p-2 md:p-3 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-all duration-200 hover:scale-110 shadow-lg opacity-100"
              aria-label="Delete post"
            >
              <svg
                className="w-4 h-4 md:w-6 md:h-6"
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
            <h1 className="text-lg md:text-3xl font-bold mb-6 font-bitter">
              {post.title}
            </h1>
            <p className="text-gray-300 leading-relaxed text-sm md:text-lg flex-1 font-raleway">
              {post.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
