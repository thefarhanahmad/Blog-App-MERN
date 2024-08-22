import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="px-4 py-2 flex justify-evenly gap-1 items-center bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
      onClick={() => navigate(-1)}
    >
      <IoMdArrowBack />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
