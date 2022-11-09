import mongoose from "mongoose";

const counter_schema = {
    id:{
        type: String,
    },
    seq:{
        type:Number,
    }
} 

const Counter_model=new mongoose.model('Counter', counter_schema);
export default Counter_model;