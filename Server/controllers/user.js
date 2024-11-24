const {createToken}=require("../middleware/auth");
const User=require("../models/user");
exports.signup=async (req,res) => {
    const {fullName,email,password}=req.body;
    try {
        await User.create({fullName,email,password})
            .then((user) => {
                const userId=user._id
                const token=createToken({userId,email})
                res.status(200).json({message: "User registered successfully!",
                    token:token
                });
            }).catch((err) => {
                res.status(500).json({
                    message:
                        err?.message||"Some error occurred while creating the User."
                });
            })
    } catch(error) {
        res.status(500).send({message: err.message});
    }
}

exports.signIn=async (req,res) => {
    const {password}=req.body;
    try {
        const user=await User.findOne({email: req.body.email})
        if(!user) {
            res.status(400).json({
                message:
                    err?.message||"User Not Found !"
            })
        } else {
            if(user.password==password) {
                const token=createToken(user)
                return res.status(200).json({
                    message: "Login Successfully",status: "Ok",data: {
                        userName: user.fullName,
                        email: user.email,
                        profileImage: user.profileImageURL,
                        role: user.role,
                        token: token
                    }
                })
            } else {
                res.status(200).json({message: "Incorrect Email or Password !"});
            }
        }
    } catch(err) {
        res.status(500).json({
            message: "Internal Server Error !"
        });
    }
}

exports.deleteUser=async (req,res) => {
    try {
        const user=await User.findOne({email: req.body.email})
        if(!user||user===null) {
            res.status(400).json({
                message: "User Not Found !"
            })
        } else {
            await User.deleteOne({email: req.body.email})
                .then(result => {
                    if(result!==0)
                        res.status(200).json({message: "Account deleted Successfully !",status: "OK"})
                    else {
                        res.status(400).json({data: {message: "User Not Found !",status: "Fail"}})
                    }
                })
                .catch((err) => {
                    res.status(200).json({message: "Something Went Wrong !",status: "Fail",err: err})
                })
        }
    } catch(err) {
        res.status(200).json({message: "Something Went Wrong !",status: "Fail",err: err})
    }
}