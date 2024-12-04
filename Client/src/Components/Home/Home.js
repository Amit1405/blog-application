import React,{useEffect,useState} from 'react'
import Card from '../Card/Card'
import "./Home.css"
import axios from 'axios'
import {BaseURL} from '../../utills/Api'

const Home=() => {
  const [blogs,setBlogs]=useState([])
  const [emptyBlogs,setIsEmptyBlogs]=useState(false)
  const [showError,setShowError]=useState(null)
  useEffect(() => {
    axios.get(`${BaseURL.DEV}/post/all/`)
      .then(function(response) {
        if(response.status===200) {
          if(response?.data?.post?.length==0) {
            setIsEmptyBlogs(true)
          } else {
            setBlogs(response?.data?.post);
          }
        }
      })
      .catch(function(error) {
          setShowError("Something Went Wrong,Please Try again later !");
      });
  },[]);
  if(showError!==null) {
    return (<div className='text-center'>
      {showError}
    </div>
    )
  }
  return (
    <>
      {
        emptyBlogs?
          <div className='no-blogs'>
            <p>There is no blogs available</p>
            <p>Thanks !</p>
          </div>
          :
          <Card cardData={blogs} />
      }
    </>
  )
}

export default Home
