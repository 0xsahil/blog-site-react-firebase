import React from 'react'
import { signOut } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const UserDetails = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const logOut = async () => {
        await signOut(auth)
        navigate("/")
    }
    return (
        <div className='flex items-start flex-col mx-auto space-y-4 mt-10 bg-slate-800 py-6 px-8 rounded-xl'>
            <img src={user?.photoURL || ""} alt={user.displayName} className='rounded-lg border-solid border-8 border-black' />
            <p className=' text-red-800 md:text-xl capitalize font-semibold'><span className=' text-slate-600'>Username : </span>{user?.displayName}</p>
            <p className=' text-red-800 md:text-xl capitalize font-semibold'><span className=' text-slate-600'>E-mail : </span>{user?.email}</p>
            <button className=" bg-slate-600 hover:bg-red-900 p-2 rounded-md font-semibold" onClick={logOut}  >Log out</button>
        </div>
    )
}

export default UserDetails