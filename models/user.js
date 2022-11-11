import mongoose from "mongoose";

const Users_schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    user_img:{
        type:String,
        // unique:true,
    },
    user_designation:{
        type:String,
        required:true,
        enum:["Engineer","Technician","Supervisor","Manager","Professor"],
    },
    dept:{
        type:String,
        enum:['Civil','Electrical','Horticulture','Sanitation'],
    },
    user_contact:{
        type:Number,
        min:10,
        unique:true,
        required:true,
    },
    user_email:{
        type:String,
        required:true,
        unique:true,
    },
    user_password:{
        type:String,
        required:true,
    },
    
})
const Users_model=new mongoose.model('User', Users_schema);

export default Users_model;
