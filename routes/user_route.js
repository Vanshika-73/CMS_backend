import express  from "express";
import {getUsers,getUser,createUser,deleteUser,updateUser} from '../controllers/user_Controller.js';
const router =express.Router();
router.get("/",getUsers);
router.get("/:username",getUser);
router.post("/",createUser);
router.put("/:username",updateUser);
router.delete("/:_id",deleteUser);

export default router;