import express from "express";
const App=express();
import Connect_db from './Connect_db.js';
import user_routes from './routes/user_route.js';
import complaint_routes from './routes/complaint_route.js'
import cors from 'cors';
import authRoute from "./routes/authRoute.js";
Connect_db();
App.use(express.json());
App.use(cors());
App.use("/users",user_routes);
App.use(express.static('upload'))
App.use("/complaints", complaint_routes);
App.use("/users/login",authRoute);
const port =process.env.PORT;
App.listen(port,()=>console.log(`server is running on port ${port}`));
    