import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { FaTimes, FaBars } from "react-icons/fa";


const Navbar = () => {
  const [user] = useAuthState(auth);


  const links = [
    {
      id: 1,
      link: "Home",
      path: "/"
    },
    {
      id: 2,
      link: "Blogs",
      path: "/blogs"
    },
    {
      id: 3,
      link: "Login",
      path: "/login"
    },
    {
      id: 4,
      link: "Create",
      path: "/create-post"
    }
  ]
  const loginLinks = [

    {
      id: 1,
      link: "Blogs",
      path: "/blogs"
    },
    {
      id: 2,
      link: "Your Blogs",
      path: "/user-blogs"
    },
    {
      id: 3,
      link: "Create",
      path: "/create-post"
    },
    {
      id: 4,
      link: "profile",
      path: "/user-details"
    }
  ]


  return user ? <NavbarChildComponent links={loginLinks} /> : <NavbarChildComponent links={links} />
}

export default Navbar


const NavbarChildComponent = ({ links }) => {
  const [nav, setNav] = useState(false);
  return <div className=' flex sticky top-0 items-center justify-between bg-gradient-to-br from-black to-slate-800 text-slate-300 p-4'>
    <Link to={"/"}><h1 className='text-white'>Blogger</h1></Link>
    <ul className='hidden md:flex ' >
      {links.map((object) => {
        return <li key={object.id} className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-red-700 duration-100">
          <Link to={object.path} >{object.link}</Link>
        </li>
      })}
    </ul>


    {/* for smaller screen  */}

    <div onClick={() => setNav(!nav)} className=" cursor-pointer p-4 z-10 text-gray-400 md:hidden">
      {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
    </div>
    {nav &&
      <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500'>
        {links.map(({ id, link, path }) => {
          return <li key={id} className="py-4 cursor-pointer capitalize text-3xl text-gray-500 hover:scale-105 hover:text-red-700 duration-100">
            <Link onClick={() => setNav(!nav)} to={path} >{link}</Link>
          </li>
        })}
      </ul>
    }
  </div>
}