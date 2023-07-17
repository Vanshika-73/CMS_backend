import Users_model from '../models/user.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fileHelper from '../utils/file.js';
import cloudinary from 'cloudinary';
let transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.EMAIL_TEST,
    pass:process.env.EMAIL_TEST_APP_PSWD
  }
});
cloudinary.config({ 
  cloud_name: process.env.Cloud_name, 
  api_key: process.env.cloud_api, 
  api_secret: process.env.api_secret 
});
async function getUsers(req, res) {
  try {
    let data2 = await Users_model.find();
    res.send(data2);
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}

async function getUser(req, res) {
  try {
    
    let { username } = req.params;
    console.log(username);
    let response;
    if(username)
    {
     response = await Users_model.find({ username:username });

    }
    else
    {
     response = await Users_model.find();

    }
    res.send(response);
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}


async function createUser(req, res) {
  console.log("req.body",req.files.userPhoto);
  console.log("user",req.body);
  let Userpassword = req.body.password;
  const file = req.files.userPhoto;
  // if (!file) { 
  //   return res
  //     .status(208)
  //     .json({ isError: true, title: "Error", message: "Image is not given" });
  // }
  // const file=req.file.filename;
  if (!file) { 
    return res
      .status(208)
         .json({ isError: true, title: "Error", message: "Image is not given" });
   }
    cloudinary.v2.uploader.upload(file.tempFilePath, 
 async function(error, result) {
    console.log("resssssss",result.secure_url);
    if (error) return res.status(208).json({
      isError: true,
      title: "Error",
      message: error,
    });
    else{
    const cc = await Users_model.findOne({
      user_email: req.body.email,
    });
    if (cc) {
      return res.status(208).json({
        isError: true,
        title: "Error",
        message: `User already exists with this mail ${req.body.email}`,
      });
    }
    const saltRounds = 10;
    bcrypt.hash(Userpassword,saltRounds, async function(err,hash){
      if(err){
        res.status(208).json({
          error:"error occured"
        })
      }
      else{
        const user = new Users_model({
          username:req.body.name,
          role:req.body.role,
          user_img:result.secure_url,
          user_contact:req.body.phone,
          user_email:req.body.email,
          dept:req.body.dept,
          user_password:hash,
        });
        user.save((err,user)=>{
          if (err) {
            console.log(err);
              return res.status(208).json({
                isError:true,
                message: "error occurd, not able to saved in db ",
              });
            }
      })
    }
});
    // console.log("urrllll",img_url);
        // }
        var mailOptions = {
          from: 'vanshikabansal73@gmail.com',
          to:req.body.email,
          subject:'SLIET Campus Management',
          text:`Your login details for Campus Management System are as follows::\n Email: ${req.body.email} \n password : ${Userpassword}`
          }
          transporter.sendMail(mailOptions,function(error,info){
            if(error){
              console.log(error.message);
            }
            else{
              console.log('email sent: ',info.response);
            }
            })
        return res.status(201).json({
          isError: false,
          title: "Success",
          message: "User saved!",
        });
      
    }
  })
  
}

async function updateUser(req, res) {
  try {
    let { username } = req.params;
    let data2 = await Users_model.updateOne({ username }, { $set: req.body });
    if(data2)
    {
      res.status(200).json({message:"User update successfully",user:data2});
    }
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}


async function deleteUser(req, res) {
  try {
    let  {username}  = req.params
    console.log(username);  
    let data2 = await Users_model.findOneAndDelete({username:username});
    console.log(data2);
    if(data2)
    {
      res.status(200).json({message:"user deleted succesffully",user:data2})
    }
    else
    {
      res.status(200).json({message:"user does not exist "})
      
    }
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}

export { getUsers, getUser, createUser, deleteUser, updateUser };
