import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dataRouter from "./src/routes/dataroutes"

dotenv.config("./.env");

const app = express();

app.use(bodyparser.json());
app.use("/user", dataRouter);

app.use("/", (req, res) =>
  res.status(200).json({
    message: "This is API",
  })
);
const dburl = process.env.DATABASEURL;

mongoose.connect(dburl, {
  //  userNewUrlParser:true,
  //   useCreateIndex:true,
  //   userUnifiedTopology:true,
  //   userFinfAndModify:false,
}).then(() => console.log("database connected successfully"));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
export default app;