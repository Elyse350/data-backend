import { check, validationResult } from "express-validator";

import dataInfos from "../model/data";
class Validator {
  static validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return res.status(400).json({ message: errorMessage });
    }
    return next();
  };
  static newAccountRules() {
    return [
      check("Email", "email is valid")
        .trim()
        .isEmail()
        .custom((value) => {
          return dataInfos.find({ Email: value }).then((user) => {
            if (user && user.length > 0) {
              return Promise.reject("Email has already been used");
            }
          });
        }),
      check("UserName", "UserName should be valid").trim().isAlpha(),
      check("Password", "password is not strong").trim().isStrongPassword(),
     
    ];
  }
}
export default Validator;
