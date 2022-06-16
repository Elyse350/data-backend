import TokenAuth from "../helpers/tokenAuth";
import dataInfos from "../model/data"
import jwt from"jsonwebtoken";
require("dotenv").config();
const config=process.env;

const VerifyToken= async(req,res,next) => {
  try{
  const token=req.body.token||req.query.token||req.headers["x-auth-token"];
  if(!token) {
    return res.status(403).json("A token is required for authentication");
  }
 

  const data = TokenAuth.decodeToken(token);
//   console.log(data)
  const {name}=data;
  if(name==="jsonWebTokenError"){
    return res.status(400).json({error:"invalid token"})
  }
  if (name==="TokenExpiredError"){
    return res.status(400).json({error:"JWT token is expired"})
  }
  req.user=data.data
 const datas =await dataInfos.findById(req.user._id);
 if(!datas){
   return res.status(404).json({error:"user not found,you are not authorised"});
 }
 return next();
}
catch(err){
  console.log(err)
}
}
export default VerifyToken;