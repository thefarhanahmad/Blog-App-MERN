import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import BackButton from "../components/BackButton";

const MyPosts = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log("post : ", user?.posts);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(user?.posts);
  });

  return (
    <div className=" w-full h-full py-10">
      <div className="m-auto w-[80%] sm:w-[80%] md:w-[60%] mb-5">
        <BackButton />
      </div>
      {posts?.length > 0 ? (
        <div>
          {posts?.map((post) => {
            return (
              <div className="mb-3">
                <PostCard key={post?._id} post={post} />
              </div>
            );
          })}
        </div>
      ) : (
        <span className="h-[85vh] text-4xl font-bold w-full  flex justify-center items-center">
          No Posts
        </span>
      )}
    </div>
  );
};

export default MyPosts;
