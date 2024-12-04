import {Formik} from "formik";
import * as Yup from "yup";
import {useEffect,useState} from "react";
import {NavLink,useNavigate} from "react-router-dom";
import {useAuth} from "../../utills/AuthContext";
import {BaseURL} from "../../utills/Api";
import axios from "axios";

// Creating schema
const schema=Yup.object().shape({
    name: Yup.string()
        .required("Name is a required field"),
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
});

const Register=() => {
    const [userdata,setUserdata]=useState([])
    const navigate=useNavigate();
    const {setIsLoggedIn}=useAuth();
    const onPressSignup=(values) => {

        const fullName=values.name
        const email=values.email;
        const password=values.password;
        const payload={
            "fullName": fullName,
            "email": email,
            "password": password
        }
        axios.post(`${BaseURL.DEV}/user/signup`,payload)
            .then((data) => {
                if(data?.status==200) {
                    localStorage.setItem('accessToken',data?.data?.token);
                    localStorage.setItem('user',JSON.stringify(data?.data?.user));
                    setUserdata(data?.data?.user);
                    setIsLoggedIn(true);
                    navigate("/my-blogs");
                }
            })
            .catch((err) => {
                console.log({err})
            })
    }
    return (
        <>
            {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
            <Formik
                validationSchema={schema}
                initialValues={{name: "",email: "",password: ""}}
                onSubmit={(values) => onPressSignup(values)}
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
                                <span>Register Here</span>
                                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Enter Name "
                                    className="form-control inp_text"
                                    id="name"
                                />
                                <p className="error">
                                    {errors.name&&touched.name&&errors.name}
                                </p>
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
                                <button type="submit">Signup</button>
                                <div style={{display: "flex",marginTop: "10px"}}>
                                    <NavLink to="/login">Login</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default Register;