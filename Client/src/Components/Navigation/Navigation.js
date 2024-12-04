import {createContext, useContext, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {CiMenuFries} from "react-icons/ci";
import {IoClose} from "react-icons/io5";
//import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './Navigation.css'
import { useAuth } from '../../utills/AuthContext';

const Navbar=() => {
  const [showNavbar,setShowNavbar]=useState(false)
  const { isLoggedIn } = useAuth();




  const handleShowNavbar=() => {
    setShowNavbar(!showNavbar)
  }
  return (
    <nav className="navbar">
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}>
          {!showNavbar? <CiMenuFries />:<IoClose />}
        </div>
        <div className={`nav-elements  ${showNavbar&&'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {
              isLoggedIn&&
              <li>
                <NavLink to="/my-blogs">My Blogs</NavLink>
              </li>
            }
            {
              isLoggedIn&&
              <li>
                <NavLink to="/write">Write</NavLink>
              </li>
            }
            {
                isLoggedIn ?
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
                :
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
            }
            {
                !isLoggedIn &&
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
            }
          </ul>
        </div>
        <div className="logo">
          BlogiFy
        </div>
      </div>
    </nav>
  )
}

export default Navbar