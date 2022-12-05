import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
function Connect_db(){
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((res)=>console.log("Mongodb is connected"));
}
export default Connect_db;