import express from "express";
const App=express();
import Connect_db from './Connect_db.js';
import user_routes from './routes/user_route.js';
import complaint_routes from './routes/complaint_route.js'
import cors from 'cors';
import authController from "./controllers/authController.js";
import fileUpload from "express-fileupload";
import image_upload_router from './routes/image_upload_route.js'
Connect_db();
App.use(express.json());
App.use(fileUpload({
    useTempFiles:true
}))

App.use(cors());
App.use("/users",user_routes);
App.use('/image/upload',image_upload_router);
App.use("/complaints", complaint_routes);
App.use("/users",authController);
const port =process.env.PORT;
App.listen(port,()=>console.log(`server is running on port ${port}`));
    