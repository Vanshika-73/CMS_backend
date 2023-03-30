import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users_model from "../models/user.js";
async function authController(req, res) {
  console.log("dd", req.body);
  try {
    let userEmail = req.body.user_email;
    let pass = req.body.user_password;
    console.log("email", userEmail);
    let user = await Users_model.findOne({ user_email: userEmail });
    console.log(user, "user");
    if (!user) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "Incorrect Email.",
      });
    } else {
      // res.send(user);
      // if(token){
      const com = await bcrypt.compare(pass, user.user_password);

      if (com) {
        let token = jwt.sign({ user }, process.env.secret_key);
        res
          .status(200)
          .json({ token: token, role: user.role, user: user, dept: user.dept });
        console.log(token, "fgs");
      } else {
        console.log("incoore")
        res.status(208).send({
          isError: true,
          title: "Error",
          message: "Incorrect password",
        });
      }
    }
    // }
  } catch (error) {
    // console.log("error:", error.message);
  }
}
export default authController;
