import express from "express";
import dataController from "../Controller/dataController";
import Validator from "../middleware/validator";

const dataRouter = express.Router();

dataRouter.post(
  "/register",
  Validator.newAccountRules(),
  Validator.validateInput,
  dataController.signUp
);



export default dataRouter;
