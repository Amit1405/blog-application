import React,{useEffect,useState} from 'react'
import {useNavigate,useParams} from 'react-router-dom';
import "./ViewBlog.css"
import axios from 'axios';
import {BaseURL} from '../../utills/Api'
import { MdDelete } from "react-icons/md";

const ViewBlog=() => {
    const [blogData,setBlogData]=useState()
    const [showError,setShowError]=useState(null)
    const userData=JSON.parse(localStorage.getItem("user"))
    const accessToken=localStorage.getItem('accessToken')
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(() => {
        axios.get(`${BaseURL.DEV}/post/${id}/`)
            .then(function(response) {
                if(response.status===200) {
                    setBlogData(response?.data);
                }
            })
            .catch(function(error) {
                setShowError("Something Went Wrong,Please Try again later !");
            });
    },[id]);
    const deletePost=() => {
        fetch(`${BaseURL.DEV}/post/delete/${id}/`,{
            method: "POST",
            headers: {
                'x-auth-token': accessToken,
            },
        }).then((res) => {
            if(res.status==200) {
                navigate("/my-blogs");
            }
        })
            .catch((err) => {
                alert("Something Went Wrong,Please Try again later !");
            })
    }
    if(showError!==null) {
        return (<div className='text-center'>
            {showError}
        </div>
        )
    }
    return (
        <div className="container mt-3">
            <div className='mx-auto'>
                <div className="card card-layout">
                    <div style={{display: "flex",justifyContent: "flex-end"}}>
                        {
                            blogData?.createdBy==userData?.userID&&
                            <div className='delete-container'>
                                <MdDelete onClick={() => deletePost()} size={28} color='#bb2124' cursor={"pointer"}/>
                            </div>
                        }
                    </div>
                    <img src={blogData?.postImageURL} className="card-img-top" alt="Card Image" />
                    <div className="card-body">
                        <h5 className="card-title">{blogData?.title}</h5>
                        <p>{blogData?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBlog
