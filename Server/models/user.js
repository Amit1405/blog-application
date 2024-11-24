const {Schema,model}=require("mongoose")

const userSchema=new Schema({
    fullName: {
        type: String,
        required: "Please Enter You Name",
    },
    email: {
        type: String,
        required: "Please Enter You Email",
        unique:true
    },
    password: {
        type: String,
        required: "Please Enter You Password",
    },
    profileImageURL:{
        type:String,
        default:'/Images/default.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
},{timestamps:true})


const User=model('User',userSchema);
module.exports=User