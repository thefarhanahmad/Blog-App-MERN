import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const PostCard = ({ post, setPosts }) => {
  const { user } = useSelector((state) => state.auth);
  // console.log("user : ", user);)

  // console.log("post  : ",post)

  const rawDate = post?.createdAt;
  const formattedDate = new Date(rawDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    // timeZoneName: 'short'
  });

  const base_url = import.meta.env.VITE_API_BASE_URL;
  // function to delete post
  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${base_url}/post/delete-post/${id}`);
      console.log("response", response);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      toast.success("Post Deleted");
    } catch (error) {
      console.log("error while deleting post");
    }
  };

  return (
    <div className="bg-white p-3 sm:p-5 md:w-[60%] relative sm:flex-row pb-9 flex-col flex w-[90%] sm:w-[80%] sm:gap-6 gap-4 rounded-md overflow-hidden mx-auto">
      <div className="w-full sm:w-[40%] h-40 overflow-hidden border-r">
        <img
          className="w-full h-full object-cover"
          src={post?.imageUrl}
          alt="post image"
        />
      </div>
      <div className="w-full sm:w-[40%] flex flex-col gap-1 sm:p-0 pl-1">
        <span className="text-2xl font-bold">{post?.title}</span>
        <span className="text-xs text-gray-500">{formattedDate}</span>
        <span className="text-sm font-semibold text-gray-800">
          <span className="text-xs text-gray-500">by</span>{" "}
          {post?.author?.username}
        </span>
        <span className="text-sm">
          {post?.description.length > 90 ? (
            <span>
              {post?.description.slice(0, 100)}...
              <Link
                className="font-semibold text-blue-600 px-2"
                to={`/post/${post?._id}`}
              >
                Read more
              </Link>
            </span>
          ) : (
            <span>{post?.description}</span>
          )}
        </span>
      </div>
      {user?.username === post?.author?.username && (
        <div className="absolute flex sm:flex-col flex-row gap-3 sm:top-4 sm:right-4 top-48 right-4 sm:text-2xl text-xl">
          <button
            onClick={() => deletePost(post?._id)}
            className=" text-red-600 bg-red-200 sm:p-2 p-1 rounded-full flex justify-center items-center"
          >
            <MdDelete />
          </button>
          <Link
            className=" bg-gray-300 sm:p-2 p-1 rounded-full flex justify-center items-center"
            to={`/edit-post/${post._id}`}
          >
            {" "}
            <MdEdit />
          </Link>
        </div>
      )}
      <Link
        className="font-semibold underline text-xs bottom-2 right-2 absolute text-blue-600 px-2"
        to={`/post/${post?._id}`}
      >
        View Post
      </Link>
    </div>
  );
};

export default PostCard;
