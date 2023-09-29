import mongoose, {Schema} from "mongoose";

export const PaymentIdSchema = new Schema(
	{
		pid: {type: String, required: true, unique: true},
		amount: {
			type: Number,
			required: true,
		},
		remarks: {
			type: String,
			required: true,
		},
		status: {type: String, default: "PROCESSING", enum: ["PROCESSING", "REJECTED", "APPROVED"]},
	},
	{timestamps: true}
);

const PaymentId = new mongoose.model("paymentids", PaymentIdSchema);
export default PaymentId;
