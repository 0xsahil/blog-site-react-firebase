import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {


  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <h1 className='text-slate-400 py-4 px-4 text-3xl italic'>“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” - <span className='text-slate-600'>George R.R. Martin</span> </h1>
      <Link to={"/blogs"}><button className=' px-6 py-2 rounded-lg  text-white border-solid border-4 border-slate-700 hover:bg-slate-700 duration-150'>Read Blogs</button></Link>
    </div>
  )
}

export default Home