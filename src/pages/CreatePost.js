import React, { useRef } from "react";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { addDoc, collection } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const CreatePost = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const blogRef = useRef();
    const titleRef = useRef();
    const ref = collection(db, "Blogs");

    // Submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(messageRef.current.value);
        const data = {
            blog: blogRef.current.value,
            userId: user.uid,
            name: user.displayName,
            title: titleRef.current.value
        };

        try {
            addDoc(ref, data);
            navigate("/blogs")
        }
        catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            {user && <div className="mx-2 my-3 px-3 py-2 rounded-lg sm:w-2/3 sm:mx-auto">
                <form className="flex flex-col items-start text-slate-200" onSubmit={handleSubmit}>
                    <input className="  my-2 px-3 py-2 bg-slate-800 w-full rounded-lg" placeholder="Blog title....." type="text" ref={titleRef} />
                    <textarea className=" bg-slate-800 w-full px-3 py-4 my-2 mx-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-slate-400 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-md" placeholder="Blog Description........." type="text" rows={10} ref={blogRef} />
                    <button className=" py-2 text-center rounded-lg text-white border-solid border-4 border-slate-700 hover:bg-slate-700 duration-150 w-1/3 sm:w-2/12" type="submit">Submit</button>
                </form>
            </div>}
            {!user &&
                <div className=" text-white">
                    <Login createPage={"createPage"} />
                </div>
            }
        </>
    );
};

export default CreatePost;
