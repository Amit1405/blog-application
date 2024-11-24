const Post=require("../models/post");

exports.getAllPost=async (req,res) => {
    await Post.find({})
        .then((result) => {
            return res.status(200).json({success: true,post: result});
        })
        .catch((err) => {
            return res.status(400).json({message: "Something went wrong !"});
        })
}
exports.createPost=async (req,res) => {
    const {title,description,category}=req.body;
    const createdBy=req.user._id
    //const {postImageURL}=req.file;
    //console.log({postImageURL})
    try {
        await Post.create({title,description,category,createdBy})
            .then(() => {
                res.status(200).json({message: "Post Created successfully!"});
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
exports.getSpecificPost=async (req,res) => {
    try {
        const post=await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json(post);
    } catch(err) {
        res.status(200).json({message: "Something Went Wrong !",status: "Fail",err: err})
    }
}
exports.filterPost=async (req,res) => {
    try {
        const post=await Post.find({category: req.params.category})
        if(!post) {
            return res.status(404).json({message: 'No Post Exist Related to this Category'});
        }
        res.status(200).json(post);
    } catch(err) {
        res.status(200).json({message: "Something Went Wrong !!!",status: "Fail",err: err})
    }
}
exports.deletePost=async (req,res) => {
    try {
        const post=await Post.findOne({_id: req.params.id})
        if(!post||post===null) {
            res.status(400).json({
                message: "Post Not Found !"
            })
        } else {
            await Post.deleteOne({_id: req.params.id})
                .then(result => {
                    if(result!==0)
                        res.status(200).json({message: "Post deleted Successfully !",status: "OK"})
                    else {
                        res.status(400).json({data: {message: "Post Not Found !",status: "Fail"}})
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
exports.updatePost=async (req,res) => {
    const {title,description,category}=req.body;
    try {
        await Post.findByIdAndUpdate(req.params.id,{title,description,category})
            .then((post) => {
                res.status(200).json({message: "Post Updated successfully!",post: post});
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
exports.getMyPosts=async (req,res) => {
    console.log(req.user._id)
    try {
        await Post.find({createdBy: req.user._id})
            .then((result) => {
                return res.status(200).json({success: true,post: result});
            })
            .catch((err) => {
                return res.status(400).json({message: "Something went wrong !"});
            })
    }
    catch(err) {
        console.log("---")
        return res.status(400).json({message: "Something went wrong !"});
    }
}