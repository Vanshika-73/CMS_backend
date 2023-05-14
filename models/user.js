import mongoose from "mongoose";

const Users_schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    user_img:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:["Supervisor","Admin","Professor"],
    },
    dept:{
        type:String,
        enum:['Civil','Electrical','Horticulture','Sanitation','dept'],
    },
    user_contact:{
        type:String,
        min:10,
        required:true,
    },
    user_email:{
        type:String,
        required:true
    },
    user_password:{
        type:String,
        required:true,
    },
    assignTo:{
         type:String,
    }
})
const Users_model=new mongoose.model('User', Users_schema);

export default Users_model;
