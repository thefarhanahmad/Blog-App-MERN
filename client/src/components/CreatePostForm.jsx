import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

const CreatePostForm = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  // console.log("base url : ", baseUrl);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // state variable declared
  const { user } = useSelector((state) => state.auth);
  const UserId = user?._id;
  // console.log("user : ", user);

  const [data, setData] = useState({
    title: "",
    description: "",
  });
  // console.log("Data  : ", data);

  const [image, setImage] = useState(null);
  // console.log("Image : ", image);

  //   handle change for image
  const handleImageChange = (e) => {
    // console.log("e in image change : ", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  //   handle change for data
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Uploading Post...");
    try {
      const formData = new FormData();
      // console.log("form data : ", formData);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("UserId", UserId);
      formData.append("image", image);
      // console.log("formdata after appended : ", formData);
      const response = await axios.post(`${baseUrl}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("response : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        navigate("/");
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (error) {
      console.log("error while creating post : ", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <div className="sm:w-[80%] w-[95%] mx-auto pt-4 sm:pt-14">
      <div className="m-auto mb-5">
        <BackButton />
      </div>
      <span className="text-xs text-gray-500">
        Hey{" "}
        <span className="text-sm font-semibold text-gray-700">
          {user?.username}
        </span>{" "}
        create your post here
      </span>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded border mt-1 border-gray-500 flex flex-col p-6 gap-6">
          {/* input and label */}
          <div className="flex flex-col ">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="your title..."
              value={data.title}
              onChange={handleOnChange}
              required
              className="bg-gray-300 rounded border border-gray-500 py-1 px-2 outline-none"
            />
          </div>
          {/* input and label */}
          <div className="flex flex-col ">
            <label htmlFor="description">Description</label>
            <textarea
              rows={6}
              name="description"
              placeholder="your description..."
              value={data.description}
              onChange={handleOnChange}
              required
              className="bg-gray-300 rounded py-1  border-gray-500 px-2 border outline-none"
            />
          </div>
          {/* input and label */}
          <div className="flex flex-col">
            <label htmlFor="image">Select Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className=" bg-gray-300 rounded p-1 border border-gray-500"
            />
          </div>
          <button
            className="w-full bg-blue-600 border border-gray-500 text-white font-semibold rounded text-lg p-2"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
