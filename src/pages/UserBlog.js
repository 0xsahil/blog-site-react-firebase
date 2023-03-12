import {
    query,
    collection,
    getDocs,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
const UserBlog = () => {
    const [user] = useAuthState(auth);

    const [toUpdate, setToUpdate] = useState();
    const [UpdatedBlog, setUpdatedBlog] = useState()
    const [text, setText] = useState('')

    const [BlogList, setBlogList] = useState([]);
    const blogsRef = query(collection(db, "Blogs"));

    const getBlogList = async () => {
        const userID = user?.uid;
        if (!userID) return;
        const q = query(blogsRef, where("userId", "==", userID));
        const data = await getDocs(q);
        setBlogList(data.docs.map((blog) => ({ ...blog.data(), id: blog.id })));
        // console.log(userId)
    };
    const deleteBlog = (id) => {
        const docRef = doc(db, "Blogs", id);
        setBlogList(BlogList.filter((item) => item.id !== id));
        deleteDoc(docRef);
        window.alert("Blog Deleted Successfully!");
    };
    const updateBlog = (index) => {
        setText(BlogList[index].blog)
        setToUpdate(index);
    };
    const handleChange = (e) => {
        setText(e.target.value)
        setUpdatedBlog(e.target.value);
    }
    const handleSave = (docId) => {
        const docRef = doc(db, "Blogs", docId);
        const data = { blog: UpdatedBlog }
        updateDoc(docRef, data)
        setToUpdate(null);
        getBlogList();
    }
    useEffect(() => {
        getBlogList();
    }, [user]);
    if (BlogList.length === 0) {
        return <div className=" text-white rounded-lg mt-6 bg-slate-600 mx-auto px-4 py-6 w-3/4 sm:w-2/5">
            <h1> Oopss !!! <br /> Nothing found :( </h1>
            <Link to={"/create-post"} ><button className=" text-xl bg-slate-900 hover:bg-slate-800 duration-150 px-5 py-3 mt-6 rounded-xl">Create now</button></Link> 
             </div>
    }
    return (
        <div>
            {BlogList?.map((blog, index) => {
                return (
                    <div className=" bg-black m-4 p-3 rounded-lg text-left sm:w-2/3 sm:mx-auto" key={index}>
                        <div className=" text-slate-400 my-2 text-xl ">{blog.title}</div>
                        {toUpdate === index ? (
                            <div className=" flex flex-col items-start">
                                <textarea className=" bg-slate-800 w-full px-3 py-4 my-2 mx-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-slate-400 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-md" onChange={handleChange} rows={10} value={text} />

                                <button className=" bg-green-600 hover:bg-red-800 px-6 py-2 mt-2 mb-4 rounded-md mr-3" onClick={() => handleSave(blog.id)}>Save</button>
                            </div>
                        ) : (
                            <div className=" text-slate-200 my-3">{blog.blog}</div>
                        )}
                        <button className=" text-red-600 hover:bg-red-800 hover:text-black p-2 rounded-md mr-3 duration-500" onClick={() => deleteBlog(blog.id)}>Delete</button>
                        <button className=" text-slate-600 hover:bg-slate-600 hover:text-black p-2 rounded-md duration-500" onClick={() => updateBlog(index)}>Update</button>
                    </div>
                );
            })}
        </div>
    );
};

export default UserBlog;
