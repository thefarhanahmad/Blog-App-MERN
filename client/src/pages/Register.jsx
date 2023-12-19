import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // declaring state variables
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log("user : ", user);

  const base_url = import.meta.env.VITE_API_BASE_URL;
  // console.log("base url : ",base_url)

  const navigate = useNavigate();

  // onchange function
  const userHandler = (e) => {
    // console.log("e : ", e);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // function to register user
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      if (user.username != "" || user.email != "" || user.password != "") {
        // posting data on api
        const response = await axios.post(`${base_url}/auth/register`, user);
        // console.log("response user : ", response);
        toast.success("Registration successfull");
        navigate("/login");
      } else {
        toast.error("All fields are equired");
      }

      // making user data values as empty
      setUser({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("error occured while register user : ", error);
      toast.error("Registration failed!");
    }
  };

  return (
    // wrapper
    <div className=" flex justify-center items-center h-[80vh] sm:pt-8 w-full text-white">
      {/* body */}

      {/* form */}
      <div className=" bg-white border border-gray-600 p-4 rounded text-black sm:w-[50%] w-[90%] md:w-[40%] justify-center flex items-center gap-4 flex-col">
        <h2 className="text-3xl font-semibold border-b-2 border-sky-500">
          Registration Form
        </h2>
        <form onSubmit={registerHandler} className="flex flex-col gap-4 w-full">
          {/* label and input field */}
          <div className="flex flex-col gap-1">
            <label className="" htmlFor="Username">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={user.username}
              onChange={userHandler}
              required
              className="bg-gray-200 border py-1 px-3 rounded text-gray-800 border-gray-600 shadow outline-none"
            />
          </div>

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
              required
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
              required
              className="bg-gray-200 border py-1 px-3 rounded text-gray-800 border-gray-600 shadow outline-none"
            />
          </div>

          <button className="bg-sky-700 text-white w-fit rounded py-1 px-5" type="submit">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
