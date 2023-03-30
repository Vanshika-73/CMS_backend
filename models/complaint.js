import mongoose from "mongoose";

const Complaint_schema = mongoose.Schema({
        C_no:{
            type:Number,
            required: true,
            unique:true,
        },
        person:{
            type:String,
            required:true,
        },
        file_date:{
            type:String,
            required:true,
        },
        complainant:{
            type:String,
            required:true,
        },
        complaint_status:{
            type:String,
            default:"New",
            enum:['Solved','Pending','New'],
            required:true,
        },
        wing:{
            type: String,
            enum:['Civil','Electrical','Horticulture','Sanitation','nature'],
            required:true,
        },
        wing_branch:{
            type:String,
            emu:["Plumbing","Masonry","Carpentry","Painting","Welding","Any Other","Internal","External"],
            required:true,
        },
        Date_time:{
            type:String,
            required:true,
        },  
        Location:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        contact:{
            type:Number,
            required:true
        }
})
const Complaint_model=new mongoose.model('Complaint', Complaint_schema);
export default Complaint_model;