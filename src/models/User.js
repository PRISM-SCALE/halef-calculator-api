import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    service: { type: String, required: true },
    isPhoneVerified: { type: Boolean, required: true, default: false },
    isEmailVerified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const User = new mongoose.model("user", UserSchema);
export default User;
