import mongoose from "mongoose";
const dataSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);
const data = mongoose.model("Data", dataSchema);
export default data;
