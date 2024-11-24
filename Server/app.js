const express=require("express")
const app=express()
const { PORT } = require('./config');
//const PORT=8001
const mongoose=require("mongoose")
const rateLimit=require("express-rate-limit");
// This is required to handle urlencoded data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userRouter=require("./routers/user")
const postRouter=require("./routers/post")

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:',error);
    });
const limiter=rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: true,
    message: "Too many requests, please try again after 15 minutes",
});
app.use(limiter)
app.use("/user",userRouter)
app.use("/post",postRouter)

app.listen(PORT,() => console.log(`Server Started at Port : ${PORT}`))
