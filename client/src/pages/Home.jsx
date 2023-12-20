import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Spinner from "../components/Spinner";
import { IoIosSearch } from "react-icons/io";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState("");
  const [searcValue, setSearchValue] = useState("");
  // console.log("serchaed value : ", searcValue);
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

  //  function  to search post
  const handleSearch = (e) => {
    e.preventDefault();
    if (searcValue != "") {
      const results = posts.filter((post) =>
        post.title.toLowerCase().includes(searcValue.toLowerCase())
      );
      setPosts(results);
      // setSearchValue("")
    } else {
      getAllPosts();
    }
  };

  return (
    <div className=" py-6 sm:py-8">
      <form
        onSubmit={handleSearch}
        className="bg-white border border-gray-500 flex justify-between p-1 mb-6 md:w-[59.8%] relative w-[89.8%] sm:w-[79.8%]  rounded-md overflow-hidden mx-auto"
      >
        <input
          className="w-[80%] p-2 outline-none "
          type="text"
          placeholder="search post by title name"
          value={searcValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="w-[10%]  flex justify-center items-center rounded-full text-2xl font-semibold">
          <IoIosSearch />
        </button>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {posts.length === 0 ? (
            <span className="w-[100vw] flex justify-center text-3xl">
              No Post found
            </span>
          ) : (
            <div className="flex flex-col gap-5">
              {posts.map((post) => {
                return (
                  <PostCard key={post._id} post={post} setPosts={setPosts} />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
