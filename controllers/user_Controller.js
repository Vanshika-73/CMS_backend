import Users_model from '../models/user.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
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
  try {
    let username = req.body.username
    let userEmail = req.body.user_email
    let pass = req.body.pass
    let Userpassword = pass + '@123'
    let payLoad
    const user = await Users_model.find({ username: username }) 
    if (user?.length > 0) {
      res.status(500).json("user Exist")
    }
    else {
      const saltRounds = 10;
      bcrypt.hash(Userpassword, saltRounds, async function (err, hash) {
        if (err) {
          res.send(err)
        }
        else {
          console.log(hash);
          payLoad = { ...req.body, user_password: hash }
          console.log(payLoad);
          let data2 = await Users_model.create(payLoad);
          var mailOptions = {
            from: 'vanshikabansal73@gmail.com',
            to:req.body.user_email,
            subject:'Your login details',
            text:`Your login details for Campus Management System are as follows::\n Email: ${userEmail} \n password : ${Userpassword}`
          }
          transporter.sendMail(mailOptions,function(error,info){
            if(error){
              console.log(error.message);
            }
            else{
              console.log('email sent: ',info.response);
            }
          })
          res.status(200).json({ user: data2 });

        }
      });

    }
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
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
    let  username  = req.params
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
