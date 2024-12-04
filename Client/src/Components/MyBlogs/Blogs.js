import React,{useEffect,useState} from 'react'
import Card from '../Card/Card'
import "./Blogs.css"
import {NavLink} from 'react-router-dom'
import Loader from '../Loader/Loader'

const Blogs=() => {
  const [blogs,setBlogs]=useState([])
  const [isLoading,setIsLoading]=useState(true);
  const [emptyBlogs,setIsEmptyBlogs]=useState(false)
  const accessToken=localStorage.getItem('accessToken')
  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:8001/post/myPosts",{
      method: "GET",
      headers: {
        'x-auth-token': accessToken,
      },
    }).then((res) => {
      return res.json();
    })
      .then((data) => {
        setIsLoading(false);
        if(data?.post?.length==0) {
          setIsEmptyBlogs(true)
        } else {
          setBlogs(data?.post);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log({err})
      })
  },[])
  return (
    <div>
      {
        isLoading?
          <Loader/>
          :
          <div>
            {
              emptyBlogs?
                <div className='no-blogs'>
                  <p>There is no blogs available</p>
                  <p>Thanks !</p>
                  <NavLink to="/write">Click Here Write Somthing....</NavLink>
                </div>
                :
                <Card cardData={blogs} />
            }
          </div>
      }
    </div>
  )
}

export default Blogs
