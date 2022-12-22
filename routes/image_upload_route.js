import image_upload from "../controllers/image_upload.js";
import express from 'express';
const router=express.Router();

router.post('/',image_upload);

export default router;