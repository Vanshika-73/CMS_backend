import {getComplaints,getComplaint,createComplaint,updateComplaint,deleteComplaint} from '../controllers/complaint_controller.js';
import express  from "express";

const router =express.Router();
router.get("/",getComplaints);
router.get("/complaint",getComplaint);
router.post("/",createComplaint);
router.put("/:cno",updateComplaint);
router.delete("/:_id",deleteComplaint);

export default router;