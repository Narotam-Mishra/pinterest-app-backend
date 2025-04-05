
import { Schema } from "mongoose";
import mongoose from "mongoose";

const followSchema = new Schema(
  {
    follwer: {
      type: Schema.Types.ObjectId,
      required: "User",
      required: true,
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Follow", followSchema);