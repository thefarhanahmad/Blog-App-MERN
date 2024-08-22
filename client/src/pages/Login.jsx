import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/slices/authSlice";

const Login = () => {
  // declaring state variables
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "test@user.com",
    password: "test123",
  });

  // console.log("user : ", user);
  const { token } = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // console.log("token : ", token);
  // console.log("userdetails : ", userDetails);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  // console.log("base url : ",base_url)

  // onchange function
  const userHandler = (e) => {
    // console.log("e : ", e);

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // function to login user
  const loginHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging User...");
    try {
      const response = await axios.post(`${base_url}/auth/login`, user);
      console.log("response login user : ", response);
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
        localStorage.setItem("token", response.data.token);
        dispatch(setToken(response.data.token));
        navigate("/");
      } else {
        toast.error(response.data.message, { id: toastId });
      }
      // making user data values as empty
      setUser({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("error occured while login user : ", error);
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    // wrapper
    <div className=" h-[80vh] flex justify-center items-center sm:pt-8  w-full text-white">
      {/* form */}
      <div className="bg-white text-black p-4 rounded border border-gray-600 sm:w-[50%] w-[90%] md:w-[40%] justify-center flex items-center gap-4 flex-col">
        <h2 className="text-3xl font-semibold border-b-2 border-sky-500">
          Login Form
        </h2>
        <form onSubmit={loginHandler} className="flex flex-col gap-4 w-full">
          {/* label and input field */}
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={userHandler}
              className="bg-gray-200 border py-1 px-3 rounded text-gray-800 border-gray-600 shadow outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={userHandler}
              className="bg-gray-200 border py-1 text-gray-800 px-3 rounded  border-gray-600 shadow outline-none"
            />
          </div>

          <button
            className="bg-sky-700 text-white w-fit rounded py-1 px-5"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
