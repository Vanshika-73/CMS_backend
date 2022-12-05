import authController from '../controllers/authController';
import express from 'express';

const router=express.Router();
router.post("/login",authController);
export default router;