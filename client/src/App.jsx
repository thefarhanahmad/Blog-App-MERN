import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/authSlice";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // fetch user by calling api
  const getUser = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("user response : ",response)
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      console.log("error while getting user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full bg-gray-200">
      <Navbar />

      {/* routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
