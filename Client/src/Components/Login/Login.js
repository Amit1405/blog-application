import {Formik} from "formik";
import * as Yup from "yup";
import "./Login.css"
import {useEffect,useState} from "react";
import {NavLink,useNavigate} from "react-router-dom";
import {useAuth} from "../../utills/AuthContext";
import axios from "axios";
import { BaseURL } from "../../utills/Api";

// Creating schema
const schema=Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
});

const Login=() => {
    const navigate=useNavigate();
    const {setIsLoggedIn}=useAuth();
    const [showError,setShowError]=useState("")
    const onPressLogin=(values) => {

        const email=values.email;
        const password=values.password;
        const payload={
            "email": email,
            "password": password,
        }
        axios.post(`${BaseURL.DEV}/user/signin`,payload)
            .then(function(response) {
                if(response.status===200) {
                    localStorage.setItem('accessToken',response?.data?.data?.token);
                    localStorage.setItem('user',JSON.stringify(response?.data?.data));
                    setIsLoggedIn(true);
                    navigate("/my-blogs");
                }
                else if(response.status===204) {
                    setShowError("Email and password do not match");
                }
                else {
                    setShowError("User does not exists");
                }
            })
            .catch(function(error) {
                if(error?.response?.status==400){
                    setShowError("User does not exists");
                }else{
                    setShowError("Something Went Wrong,Please Try again later !");
                }

            });
    }
    return (
        <>
            {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
            <Formik
                validationSchema={schema}
                initialValues={{email: "",password: ""}}
                onSubmit={(values) => onPressLogin(values)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <div className="login">
                        <div className="form">
                            {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                            <form noValidate onSubmit={handleSubmit}>
                                <span>Login</span>
                                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Enter email id"
                                    className="form-control inp_text"
                                    id="email"
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.email&&touched.email&&errors.email}
                                </p>
                                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Enter password"
                                    className="form-control"
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.password&&touched.password&&errors.password}
                                </p>
                                {/* Click on submit button to submit the form */}
                                <button type="submit">Login</button>
                                <p className="error">
                                   {showError}
                                </p>
                                <div style={{display: "flex",justifyContent: "space-between",marginTop: "10px"}}>
                                    <NavLink to="/forgot-password">Forgot Password</NavLink>
                                    <NavLink to="/register">Register</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default Login;