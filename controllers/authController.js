import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users_model from "../models/user.js";
import { json } from "express";
async function authController(req, res) {

    try {
        let userEmail = req.body.user_email;
        let pass = req.body.user_password;
        console.log("email",userEmail);
    let user =await Users_model.findOne({user_email: userEmail});
    console.log(user, "user");
    if (!user) res.send("user not found");
    else{
      // res.send(user);
      // if(token){
        const com =await bcrypt.compare(pass,user.user_password);

        if(com){
          let token= jwt.sign({user},process.env.secret_key);
          res.status(200).json({token:token,username:user.username, designation:user.role,user:user,dept:user.dept})
          console.log(token,"fgs");
          }
          else {
            res.status(401).send('invalid Password')
          };
        }
    // }
  } catch (error) {
    // console.log("error:", error.message);
  }
}
export default authController;