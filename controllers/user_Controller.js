import Users_model from '../models/user.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fileHelper from '../utils/file.js';
let transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.EMAIL_TEST,
    pass:process.env.EMAIL_TEST_APP_PSWD
  }
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
  console.log("req.body",req.file.filename);
  let Userpassword = req.body.name + '@123'
  const file = req.file.filename;
  if (!file) {
    return res
      .status(208)
      .json({ isError: true, title: "Error", message: "Image is not given" });
  }
  const cc = await Users_model.findOne({
    user_email: req.body.email,
  });
  if (cc) {
    if (req.file) {
      const pathImg = "images/" + req.file.filename;
      fileHelper(pathImg);
    }
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
        user_img:file,
        user_contact:req.body.phone,
        user_email:req.body.email,
        user_password:hash,
      });
      user.save((err,user)=>{
        if (err) {
          //err
          console.log(err);
          if (file) {
            const pathImg = "images/" + file;
            fileHelper(pathImg);
          }
          else{
            return res.status(208).json({
              isError:true,
              message: "error occurd, not able to saved in db ",
            });
          }
        }
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
      })
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
