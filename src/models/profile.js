import { Schema, model } from "mongoose";

const profileSchema = Schema({
  username: {
    type: String,
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default model("profiles", profileSchema);