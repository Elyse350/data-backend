import hash  from "bcrypt";
import dataInfos from "../model/data";
const bcrypt = require("bcrypt");

class dataController {
  static async signUp(req, res) {
    const hashPassword = bcrypt.hashSync(
      req.body.Password ,
      10
    );
    req.body.Password = hashPassword;
    
    const data = await dataInfos.create(req.body);
    if (!data) {
      return res.status(404).json({ error: "user not registered" });
    }
    return res
      .status(200)
      .json({ message: "user created successfully", data: data });
  } 
  static async getAllUsers(req,res){
    const users= await dataInfos.find();
    if(!users){
        return res.status(404).json({error:"no users registered"})
    }
    return res
    .status(200)
    .json({message:"Successfully retrieved users" , data: users});
}
}

export default dataController;
