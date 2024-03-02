import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../store/slices/authSlice";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast"

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user : ",user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to logout user
  const logOut = () => {
    localStorage.clear("token");
    dispatch(removeToken());
    dispatch(removeUser());
    toast.success("Log Out successfull")
    navigate("/login");
  };

  return (
    <div className="w-full h-screen">
      {user ? (
        <div className="w-[90%] sm:w-[70%] md:w-[50%] m-auto bg-white p-6 border-black border mt-16 rounded flex flex-col gap-2">
          <p className="text-2xl text-center">Profile</p>
          <p className="text-lg text-gray-900 font-bold">{user?.username}</p>
          <p className="text-sm font-semibold text-gray-700">{user?.email}</p>
          <button
            className="bg-red-600 text-xl p-2 mt-5 text-white rounded"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Profile;
