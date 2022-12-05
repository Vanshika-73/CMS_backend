import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users_model from "../models/user.js";
import { json } from "express";
async function authController(req, res) {
    try {
        let userName = req.body.username;
        let pass = req.body.user_password;
    let user =await Users_model.findOne({ username: userName});
    if (!user) res.send("user not found");
    else{
      // res.send(user);
      // if(token){
        // const com=await bcrypt.compare(pass,user.user_password);

        if(user.user_password==pass){
          let token= jwt.sign({user},process.env.secret_key);
          res.status(200).json(token)
          console.log(token,"fgs");
          }
          else res.send("Invalid password");
        }
    // }
  } catch (error) {
    // console.log("error:", error.message);
  }
}
export default authController;