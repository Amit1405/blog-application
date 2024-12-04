import {Form,Formik} from "formik";
import {useState} from "react";
import * as Yup from "yup";
import "./Write.css"
import {useNavigate} from "react-router-dom";

const AddBlog=({route}) => {
    const [isLoading,setIsLoading]=useState(false);
    const accessToken=localStorage.getItem('accessToken')
    const [preview,setPreview]=useState(null);
    const userData=JSON.parse(localStorage.getItem("user"))
    console.log({userData})
    const navigate=useNavigate()
    const schema=Yup.object().shape({
        title: Yup.string()
            .required("Title is Required"),
        category: Yup.string()
            .required("Please Select Category"),
        description: Yup.string()
            .required("description is Required"),
        postImageURL: Yup.string()
            .required("Please add Image")
    });

    const handleFileChange=(event,setFieldValue) => {
        const file=event.currentTarget.files[0];
        setFieldValue('postImageURL',file);

        // Create a preview URL for the selected file
        const previewUrl=URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    const handleSubmit=(values) => {
        const formData=new FormData();
        formData.append('postImageURL',values.postImageURL);
        formData.append('title',values.title);
        formData.append('description',values.description);
        formData.append('category',values.category);
        setIsLoading(true);

        fetch("http://localhost:8001/post/create",{
            method: "POST",
            headers: {
                'x-auth-token': accessToken,
            },
            body: formData
        }).then((res) => {
            console.log("Blog added successfully!",res);
            setIsLoading(false);
            navigate("/my-blogs");
        })
            .catch((err) => {
                console.log({err})
            })
    }

    return (
        <div className="container mt-3">
            <div className="mx-auto">
                <Formik
                    validationSchema={schema}
                    initialValues={{title: "",description: "",category: "",postImageURL: null}}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <div className="login">
                            <div className="add-blog-form">
                                <div className="form-heading">
                                    <h4>{!route=="edit"? "Edit Blog":"Create Blog"}</h4>
                                </div>
                                <Form>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        placeholder="Enter Title"
                                        className="form-control inp_text"
                                        id="title"
                                    />
                                    <p className="error">
                                        {errors.title&&touched.title&&errors.title}
                                    </p>
                                    <label>Category</label>
                                    <select
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="PLEASE SELECT">PLEASE SELECT</option>
                                        <option value="TECHNOLOGY">TECHNOLOGY</option>
                                        <option value="ARTS">ARTS</option>
                                        <option value="SCIENCE">SCIENCE</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                    <p className="error">
                                        {errors.category&&touched.category&&errors.category}
                                    </p>
                                    <label>Description</label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        placeholder="Enter Description"
                                        id="description"
                                        rows={7}
                                    />
                                    <p className="error">
                                        {errors.description&&touched.description&&errors.description}
                                    </p>
                                    <label>
                                        Upload Image
                                    </label>
                                    <input
                                        id="photo"
                                        name="photo"
                                        type="file"
                                        onChange={(event) => handleFileChange(event,setFieldValue)}
                                    />
                                    <p className="error">
                                        {errors.postImageURL&&touched.postImageURL&&errors.postImageURL}
                                    </p>
                                    {/* Click on submit button to submit the form */}
                                    <button type="submit">{isLoading? "Creating...":"Create"}</button>
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddBlog;
