import Users_model from '../models/user.js';

async function getUsers(req,res){
    try {
        let data2 = await Users_model.find();
        res.send(data2);
      } catch (error) {
        console.log("error:", error.message);
        res.send(`eeror:${error.message}`);
      }
}

async function getUser(req,res){
    try {
        let { username } = req.params;
        let data2 = await Users_model.find({ username });
        res.send(data2);
      } catch (error) {
        console.log("error:", error.message);
        res.send(`eeror:${error.message}`);
      }
}


async function createUser(req,res){
    try {
        let data2 = await Users_model.create(req.body);
        res.end();
      } catch (error) {
        console.log("error:", error.message);
        res.send(`eeror:${error.message}`);
      }
}

async function updateUser(req,res){
    try {
        let { username } = req.params;
        let data2 = await Users_model.updateOne({ username }, { $set: req.body });
        res.end();
      } catch (error) {
        console.log("error:", error.message);
        res.send(`eeror:${error.message}`);
      }
}
  

async function deleteUser(req,res){
    try {
        let { _id } = req.params;
        let data2 = await Users_model.deleteOne({ _id }, { $set: req.body });
        res.end();
      } catch (error) {
        console.log("error:", error.message);
        res.send(`eeror:${error.message}`);
      }
}
  
export {getUsers,getUser,createUser,deleteUser,updateUser};
