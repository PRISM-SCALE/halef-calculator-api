import mongoose, {Schema} from "mongoose";

export const PaymentIdSchema = new Schema(
	{
		pid: {type: String, required: true},
		amount: {
			type: Number,
			required: true,
		},
		remarks: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
);

const PaymentId = new mongoose.model("paymentids", PaymentIdSchema);
export default PaymentId;
