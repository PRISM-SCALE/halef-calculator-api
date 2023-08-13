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
    interests : [{
      service : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
      },
      count: {
        type: Number,
        default: 0
      }

    }],
    isPhoneVerified: { type: Boolean, required: true, default: false },
    isEmailVerified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const User = new mongoose.model("user", UserSchema);
export default User;
