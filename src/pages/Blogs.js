/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../firebase';

const Blogs = () => {
    const [BlogList, setBlogList] = useState([]);
    const blogsRef = query(collection(db, "Blogs"));
    const getBlogList = async () => {
        const data = await getDocs(blogsRef);
        const newBlogList = data.docs.map((blog) => ({ ...blog.data(), id: blog.id }))
        setBlogList(newBlogList)
    }

    useEffect(() => {
        getBlogList();
    }, [])

    if (BlogList.length === 0) return <>loading!!</>

    return (
        <div>
            <div className='flex flex-col mb-5 sm:flex-row items-center sm:flex-wrap mt-6 sm:mx-auto'>
                {BlogList.map((blog, index) => {
                    const { title, id, name } = blog;
                    const getTitle = () => {
                        if (title.length > 15) return `${title.substr(0, 15)}...`
                        return title;
                    }
                    return (

                        <div key={index} className=' text-slate-300 flex items-start flex-col mx-auto space-y-4 my-2 bg-gradient-to-br from-black to-slate-900 px-3 py-6 rounded-lg text-start w-2/3 sm:w-5/12 lg:w-80'>
                            <div className=' capitalize'>{getTitle()}</div>
                            <Link to={`/blog/read-more/${id}`} ><button className=' text-red-800 lowercase '>Read blog...</button></Link>

                            <div className='self-end text-slate-500 font-semibold capitalize italic text-sm'>{name}</div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Blogs