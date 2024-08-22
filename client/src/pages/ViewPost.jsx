import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";

const ViewPost = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [post, setPost] = useState("");
  // console.log("user : ", user);
  // console.log("post :", post);
  const navigate = useNavigate();

  const { id } = useParams();
  // console.log("params : ", id);
  const base_url = import.meta.env.VITE_API_BASE_URL;

  // function to fetch post details
  const getPostDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/posts/${id}`);
      console.log("response : ", response);
      setPost(response.data.post);
      setLoading(false);
    } catch (error) {
      console.log("error while fethcing post by id ");
    }
  };
  // function to delete post
  const deletePost = async (id) => {
    const toastId = toast.loading("Deleting Post...");
    try {
      const response = await axios.delete(`${base_url}/posts/${id}`);
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        navigate("/");
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (error) {
      console.log("error while deleting post");
      toast.error(response.data.message, { id: toastId });
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  const rawDate = post.createdAt;
  const formattedDate = new Date(rawDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // timeZoneName: 'short'
  });

  return (
    <div className="h-[100vh]">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="m-auto w-[90%] sm:w-[75%] mt-16 mb-6">
            <BackButton />
          </div>
          <div className="bg-white p-2 sm:p-4 relative flex-col flex w-[90%] sm:w-[75%] gap-4 overflow-hidden mx-auto">
            <div className="w-full h-40 overflow-hidden border-r">
              <img
                className="w-full h-full object-cover"
                src={post.imageUrl}
                alt="post image"
              />
            </div>
            <div className="w-full flex flex-col gap-1 sm:p-0 pl-1">
              <span className="text-2xl font-bold">{post.title}</span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
              <span className="text-sm font-semibold text-gray-800">
                <span className="text-xs text-gray-500">Posted by</span>{" "}
                {post?.author?.username}
              </span>
              <span className="text-sm">{post.description}</span>
            </div>
            {user?.username === post?.author?.username && (
              <div className="absolute flex flex-row gap-3 top-48 right-4 sm:text-2xl text-xl">
                <button
                  onClick={() => deletePost(post._id)}
                  className=" text-red-600 bg-red-200 sm:p-2 p-1 rounded-full flex justify-center items-center"
                >
                  <MdDelete />
                </button>
                <Link
                  className=" bg-gray-300 sm:p-2 p-1 rounded-full flex justify-center items-center"
                  to={"/"}
                >
                  {" "}
                  <MdEdit />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPost;
