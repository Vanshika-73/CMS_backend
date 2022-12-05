import jwt from 'jsonwebtoken';
import Users_model from '../models/user.js';
// import dotenv from 'dotenv';
async function auth(req,res,next){
    try{
        let token=await req.headers.authorization?.split(" ")[1];
        if(!token) res.send("you are not authorized");
        let verify=jwt.verify(token,process.env.secret_key);
        // console.log(verify);
        let users = await Users_model.findById(verify.user._id)
        if(!users) res.send("token not verified")
        req.users = users
        next();
       
    }catch(error){
        res.send(`error:${error.message}`);
    }
}

export default auth;