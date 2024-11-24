const jwt=require("jsonwebtoken")
const User=require("../models/user")
exports.createToken=(user) => {
    const payload={
        _id: user.userId,
        email: user.email,
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
    return token;
}
exports.authToken=async (req,res,next) => {
    try {
        const token=req.header("x-auth-token");
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        await User.findById(decoded?._id)
            .then((user) => {
                req.user=user;
                next();
            }).catch((err) => {
                res.status(404).json({message: "Invalid ...",status: "fail"});
            })
    } catch(err) {
        res.status(404).json({message: "Invalid token",status: "fail"});
    }
}