import mongoose, {Schema} from "mongoose";

export const EnquiresSchema = new Schema(
	{
		interests: {
			service: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: "service",
			},
			count: {
				type: Number,
				default: 0,
			},
		},

		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	},
	{timestamps: true}
);

const Enquires = new mongoose.model("enquires", EnquiresSchema);

export default Enquires;
