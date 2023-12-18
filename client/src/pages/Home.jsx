import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Spinner from "../components/Spinner";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState("");
  // console.log("posts : ", posts);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  // console.log("base url : ", baseUrl);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/post/all-posts`);
      // console.log("posts response : ", response);
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.log("error while fetching posts");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className=" py-6 sm:py-8">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {posts.length === 0 ? (
            <span>No Post here</span>
          ) : (
            <div className="flex flex-col gap-5">
              {posts.map((post) => {
                return <PostCard key={post._id} post={post} setPosts={setPosts} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
