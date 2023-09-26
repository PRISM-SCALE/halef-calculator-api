import mongoose, {Schema} from "mongoose";

export const PaymentSchema = new Schema(
	{
		name: {type: String, required: true},
		email: {
			type: String,
			required: true,
			// unique: true
		},
		phone: {
			type: Number,
			required: true,
			// unique: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		paymentId: {
			type: String,
			required: true,
		},
		// paymentId: {type: Schema.Types.ObjectId, ref: "vehicle"},
		isTermsAndConditionsVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		isPhoneVerified: {type: Boolean, required: true, default: false},
		isEmailVerified: {type: Boolean, required: true, default: false},
		isPaymentSuccessful: {type: Boolean, required: true, default: false},
	},
	{timestamps: true}
);

const Payment = new mongoose.model("payment", PaymentSchema);
export default Payment;
