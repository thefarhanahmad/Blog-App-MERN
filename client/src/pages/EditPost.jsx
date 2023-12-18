import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  // console.log("id : ",id)
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  // console.log("base url : ", baseUrl);

  const navigate = useNavigate();

  // state variable declared
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    newTitle: "",
    newDescription: "",
  });
  //   console.log("Data  : ", data);

  //   handle change for data
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${baseUrl}/post/update-post/${id}`,
        data
      );
      //   console.log("response : ", response);
      toast.success("Post updated successfully!");
      navigate("/");
    } catch (error) {
      console.log("error during edit post : ", error);
    }
  };

  return (
    <div className="sm:w-[80%] h-screen w-[95%] mx-auto pt-8 sm:pt-14">
      <span className="text-xs text-gray-500">
        Hey{" "}
        <span className="text-sm font-semibold text-gray-700">
          {user?.username}
        </span>{" "}
        Edit your post here
      </span>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded border mt-1 border-gray-500 flex flex-col p-6 gap-6">
          {/* input and label */}
          <div className="flex flex-col ">
            <label htmlFor="newTitle">Title</label>
            <input
              type="text"
              name="newTitle"
              placeholder="new title..."
              value={data.newTitle}
              onChange={handleOnChange}
              required
              className="bg-gray-300 rounded border border-gray-500 py-1 px-2 outline-none"
            />
          </div>
          {/* input and label */}
          <div className="flex flex-col ">
            <label htmlFor="newDescription">Description</label>
            <textarea
              name="newDescription"
              placeholder="new description..."
              value={data.newDescription}
              onChange={handleOnChange}
              required
              className="bg-gray-300 rounded py-1  border-gray-500 px-2 border outline-none"
            />
          </div>

          <button
            className="w-full bg-blue-600 border border-gray-500 text-white font-semibold rounded text-lg p-2"
            type="submit"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
