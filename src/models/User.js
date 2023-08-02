import mongoose, {Schema} from "mongoose";

export const UserSchema = new Schema(
	{
		name: {type: String, required: true},
		email: {type: Number, required: true, unique: true},
		phone: {type: Number, required: true, unique: true},
		countryCode: {type: String, required: true, unique: true},
		isPhoneVerified: {type: Boolean, required: true},
		isEmailVerified: {type: Boolean, required: true},
	},
	{timestamps: true}
);

const User = new mongoose.model("user", UserSchema);
export default User;
