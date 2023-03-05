import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ReadMore = () => {
    const { blogId } = useParams();
    // const blogId  = "asdfasdfsadfsa";
    const [BlogToShow, setBlogToShow] = useState("Not Found")

    const docRef = doc(db, "Blogs", blogId)

    useEffect(() => {
        getBlog();
    }, []);

    const getBlog = async () => {
        const blog = await getDoc(docRef);
        if (blog.exists()) {
            console.log("data :", blog.data());
            setBlogToShow(blog.data());
        }
        else {
            console.log("not found")
        }
    }


    // console.log('test', DocId)
    if (BlogToShow.length === 0) return <div className='text-white'>loading!!</div>
    return (
        <div className=' sm:w-2/3 h-full text-white text-left bg-black px-3 rounded-xl py-4 mx-4 my-4'>
            {/* <h3>Read more page</h3> */}
            <h2 className=' text-2xl md:text-3xl text-slate-400 my-1'>{BlogToShow.title}</h2>
            <p className='text-slate-200 my-4 md:text-lg'>{BlogToShow.blog}</p>
            <p className=' text-right text-xl italic font-light capitalize'>{BlogToShow.name}</p>

        </div>
    )
}

export default ReadMore