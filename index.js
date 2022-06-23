import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dataRouter from "./src/routes/dataroutes"
import cors from "cors"
import { METHODS } from "http";

dotenv.config("./.env");

const app = express();
const corsOptions={
  origin:'*',
  credentionals:true ,
  optionSuccessStatus:200
}
app.use(bodyparser.json());
app.use("/user", dataRouter);
app.use(cors(corsOptions));
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin:*');
res.setHeader('Access-Control-Allow-METHODS:GET,POST,PUT,PATCH,DELETE');
res.setHeader('Acces-Control-Allow-METHODS:Origin,Content-Type,x-auth-token');
next();
})
app.use("/", (req, res) =>
  res.status(200).json({
    message: "This is API",
  })

);
const dburl = process.env.DATABASEURL;

mongoose.connect(dburl, {
   
}).then(() => console.log("database connected successfully"));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  
});
export default app;