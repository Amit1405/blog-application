const express=require("express")
const router=express.Router()
const postController=require("../controllers/post");
const auth=require("../middleware/auth")
const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.resolve(`./public/uploads/${req.user._id}`))
    },
    filename: function(req,file,cb) {
        const fileName=`${Date.now()} - ${file.originalname}`
        cb(null,fileName)
    }
})

const upload=multer({storage: storage})

router.get("/all",postController.getAllPost);
router.get("/myPosts",auth.authToken,postController.getMyPosts);
router.post("/create",auth.authToken,postController.createPost);
//router.post("/create",upload.single('post-image'),postController.createPost);
router.post("/delete/:id",auth.authToken,postController.deletePost);
router.put("/update/:id",auth.authToken,postController.updatePost);
router.get("/:id",auth.authToken,postController.getSpecificPost);
router.get("/filter/:category",postController.filterPost);

module.exports=router