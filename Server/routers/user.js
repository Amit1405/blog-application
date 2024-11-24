const express=require("express")
const router=express.Router()
const userController=require("../controllers/user")
let auth=require("../middleware/auth");

router.post('/signup',userController.signup)
router.post('/signin',userController.signIn)
router.post('/delete',auth.authToken,userController.deleteUser)
router.get('/',(req,res)=>{
    res.status(200).send({ message: "Thanks For Visit !" });
})
module.exports=router