import React from 'react';
import { Link} from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";


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
    }
  ]
  return (
    <>

      {!user &&
        <div className=' flex sticky items-center justify-between bg-gradient-to-r from-black to-gray-800 text-slate-300 p-4'>
          <Link to={"/"}><h1 className='text-white'>Blogger</h1></Link>
          <div className='md:space-x-4 text-white'>
            {links.map((object) => {
            return <Link key={object.id} to={object.path} >{object.link}</Link>
            })}
          </div>
        </div>
      }

      {user &&
        <div className=' flex sticky items-center justify-between bg-gradient-to-br from-black to-slate-800 text-slate-300 p-4'>
          <Link to={"/"}><h1 className='text-white'>Blogger</h1></Link>
          <div className='flex items-center md:space-x-4 justify-end md:ml-50' >
            {loginLinks.map((object) => {
              return <Link key={object.id} to={object.path} >{object.link}</Link>
            })}

            <Link to={"/user-details"}><img src={user?.photoURL || ""} alt={user.displayName} className='h-12 w-12 rounded-full' /></Link>           
          </div>
        </div>
      }
    </>
  )
}

export default Navbar