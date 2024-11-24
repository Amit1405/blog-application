const {Schema,model, mongo}=require("mongoose")

const postSchema=new Schema({
    title: {
        type: String,
        required: "Please Enter Title",
    },
    description: {
        type: String,
        required: "Please Enter Description",
    },
    category: {
        type: String,
        enum:['ALL','ARTS','SCIENCE','TECHNOLOGY'],
        default:'ALL',
        required: "Please Enter Category",
    },
    postImageURL:{
        type:String,
        default:'/Images/default.png'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})


const Post=model('post',postSchema);
module.exports=Post