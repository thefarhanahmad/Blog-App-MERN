import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation().pathname;

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="bg-white w-full h-16 relative">
      <div className="w-[95%] bg-white sm:w-[80%] md:w-[70%] m-auto flex justify-between px-4 items-center h-full">
        {/* logo */}
        <Link
          className="text-4xl text-gray-950 -rotate-3 shadow bg-white font-my-font"
          to="/"
        >
          <span className="text-2xl underline">the</span>BLOG
        </Link>

        {/* nav links */}
        <div className="hidden sm:flex">
          {token ? (
            <div className="flex gap-8 text-lg font-semibold text-gray-800">
              <Link
                className={`${
                  location === "/create-post"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/create-post"}
              >
                Create Post
              </Link>
              <Link
                className={`${
                  location === "/profile"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/profile"}
              >
                <span>{"Profile"}</span>
              </Link>
            </div>
          ) : (
            <div className="flex gap-8 text-lg font-semibold text-gray-800">
              <Link
                className={`${
                  location === "/login"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className={`${
                  location === "/register"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/register"}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* responsive navbar */}

        <button
          className="flex sm:hidden  flex-col gap-1"
          onClick={() => setOpenMenu((pre) => !pre)}
        >
          {openMenu ? <RxCross2 /> : <BiMenu />}
        </button>
      </div>
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className=" backdrop-blur  flex w-full justify-center h-screen absolute z-20 transition-all duration-200"
        >
          {token ? (
            <div className="flex flex-col gap-6 bg-white absolute top-0 w-full border border-gray-300 items-center z-40 py-20 h-fit text-lg font-semibold text-gray-800">
              <Link
                onClick={() => setOpenMenu(false)}
                className={`${
                  location === "/create-post"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/create-post"}
              >
                Create Post
              </Link>
              <Link
                onClick={() => setOpenMenu(false)}
                className={`${
                  location === "/profile"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/profile"}
              >
                <span>{"Profile"}</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6 bg-white absolute top-0 w-full border border-gray-300 items-center z-40 py-20 h-fit text-lg font-semibold text-gray-800">
              <Link
                onClick={() => setOpenMenu(false)}
                className={`${
                  location === "/login"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/login"}
              >
                Login
              </Link>
              <Link
                onClick={() => setOpenMenu(false)}
                className={`${
                  location === "/register"
                    ? "underline underline-offset-4 transition-all duration-200"
                    : "no-underline"
                }`}
                to={"/register"}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
