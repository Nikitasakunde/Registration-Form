const express  = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const app = express();
app.use(bodyparser.urlencoded(
    {
    extended : true
    }
))

app.use(express.json())


const user_Schema1 = new mongoose.Schema({
    fullname : {
        type:String,
        required : true,
        lowercase: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    phone:{
        type :Number,
        required:true,
        unique: true

    },
    password:{
        type:String,
        required:true

    }
})



const users_collection1 = mongoose.model('user_collection1' , user_Schema1);


// mongoose.connect('mongodb://localhost:27017/myuserdata')
// .then(()=>{console.log("mongoose coonnection successful"
// .catch((err)=>{console.log(err)})


const monngodb_url = "mongodb+srv://root:root@cluster0.h31lqor.mongodb.net/mydata"
// or
// const monngodb_url = "mongodb+srv://nikita:nikita@cluster0.h31lqor.mongodb.net/authDB"
mongoose.connect(monngodb_url, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log("mongodb not connected");
    console.log(error);
});



let mainfolder = path.join(__dirname)


app.get('/' ,(req, res)=>{
    // res.send("home page");
    res.sendFile(mainfolder + '/index.html')
    // console.log(__dirname);
    // console.log(mainfolder)
})

app.get('/register',(req , res)=>{
    res.sendFile(mainfolder + '/index.html')


})
app.post('/' ,(req,res)=>{
    let req_userdata = users_collection1(req.body);
    req_userdata.save();
    console.log("Registered successful");
})


app.post('/register' ,(req,res)=>{
    let req_userdata = users_collection1(req.body);
    req_userdata.save();
    console.log("Registered successful");
})


app.listen(port ,()=>{
    console.log(`listening on port ${port}`);
})
