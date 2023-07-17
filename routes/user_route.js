import express from "express";
import multer from "multer";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user_Controller.js";

// const storage = multer.diskStorage({
//     //destination folder
//   destination: function (req, file, cb) {
//     cb(null, "upload/");
//   },
//   //name of file
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const router = express.Router();
router.get("/", getUsers);
router.get("/:username", getUser);
router.post("/", createUser);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);

export default router;
