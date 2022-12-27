import {getComplaints,getComplaint,createComplaint,deleteComplaint,updateComplaintStatus} from '../controllers/complaint_controller.js';
import express  from "express";

const router =express.Router();
router.get("/",getComplaints);
router.get("/:cno",getComplaint);
router.post("/",createComplaint);
router.put("/:cno",updateComplaintStatus);
router.delete("/:_id",deleteComplaint);

export default router;