import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from './firebase';
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import UserBlog from "./pages/UserBlog";
import UserDetails from "./pages/UserDetails";
import ReadMore from "./pages/ReadMore";
import Footer from "./components/Footer";

function App() {
  // const [user] = useAuthState(auth);
  return (
    <div className="flex flex-col text-center bg-slate-900 min-h-screen">
      <Router>
        <Navbar />
        <div className=" min-h-screen">
          <Routes>
            <Route path="*" element={<><h1>Page Not Available</h1></>} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/user-blogs" element={<UserBlog />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/blog/read-more/:blogId" element={<ReadMore />} />

          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
