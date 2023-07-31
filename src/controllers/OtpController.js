const deliveryStatusAndNumbers = {};

export const sendOTP = async (req, res) => {
	console.log(req.body.data);
	const {phone} = req.body.data;

	const config = {
		headers: {
			"Content-Type": "application/json",
			"api-key": "c1pN8oDCPK3HFz4v6Ok5GLdV9sEA0URx",
			"api-login": "sesh.io1022@gmail.com",
			"cache-control": "cache-control",
		},
	};
	fetch("https://api.octopush.com/v1/public/sms-campaign/send", {
		method: "POST",
		body: JSON.stringify(phone),
		...config,
	})
		.then(function () {
			for (const n in req.body.data) {
				deliveryStatusAndNumbers[n.phone] = "SENT";
			}
			res.setHeader("content-type", "Application/json");
			res.statusCode = 200;
			res.json({response_desc: "Success"});
		})
		.catch(function (error) {
			console.log(error);
		});
};

export const status = async (req, res) => {
	res.setHeader("content-type", "Application/json");
	res.statusCode = 200;
	res.json({delivery_status: deliveryStatusAndNumbers[req.body.phone]});
};

export const delivered = async (req, res) => {
	console.log(req.body);
	deliveryStatusAndNumbers[req.body.phone] = req.body.status;
	res.status(200).end();
};
