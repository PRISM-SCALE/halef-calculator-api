import mongoose, {Schema} from "mongoose";

export const EnquiresSchema = new Schema(
	{
		interests: [
			{
				service: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "Service",
				},
				count: {
					type: Number,
					default: 0,
				},
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{timestamps: true}
);

const Enquires = new mongoose.model("enquires", EnquiresSchema);

export default Enquires;
