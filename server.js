import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/index.js";

dotenv.config();
const app = express();

//DB connection
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log(`Successfully extablished Database connection.`);
		//creating server
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => console.error(error));

mongoose.connection.on("error", (err) => {
	console.error(err);
});

//middlewares
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use("/api", router);
app.get("/", (req, res) => {
	console.log("Hello");
	res.status(200).send("HELLO!");
});

// //creating server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
