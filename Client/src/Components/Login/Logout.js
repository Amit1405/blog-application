import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../utills/AuthContext'

const Logout=() => {
    const navigate=useNavigate()
    const { setIsLoggedIn } = useAuth();
    useEffect(() => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
    },[])
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <p>Logout...</p>
                </div>
            </div>
        </div>
    )
}

export default Logout
