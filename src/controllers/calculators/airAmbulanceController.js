import AirAmbulanceCost from "../../models/airAmbulanceCost.js";

const calculateCost = async (cityCombinationType, weight, packingCost, res) => {
	const airAmbulanceCostMap = await AirAmbulanceCost.findOne({cityCombinationType})
		.where("minWeight")
		.lte(Number(weight))
		.where("maxWeight")
		.gte(Number(weight))
		.exec();

	// console.log(airAmbulanceCostMap);
	const perKgCost = airAmbulanceCostMap.rate;

	// ----------------------------------------------------------
	if (weight <= 130) {
		const total = perKgCost * 130 + packingCost;

		return res.send({
			currency: "INR",
			cityCombinationType,
			costData: [
				{name: "RATE/KG", cost: perKgCost, unit: "₹"},
				{name: "PACKING", cost: packingCost, unit: "₹"},
				{name: "AIR AMBULANCE COST", cost: total, unit: "₹"},
			],
		});
	} else {
		const total = perKgCost * weight + packingCost;

		return res.send({
			currency: "INR",
			cityCombinationType,
			airAmbulanceCost: [
				{name: "RATE/KG", cost: perKgCost, unit: "₹"},
				{name: "PACKING", cost: packingCost, unit: "₹"},
				{name: "AIR AMBULANCE COST", cost: total, unit: "₹"},
			],
		});
	}
	// ----------------------------------------------------------
};

export const airAmbulanceCalc = async (req, res, next) => {
	try {
		const {weight, sourceCity, destinationCity, isPackingRequired} = req.body;
		const airportCities = [
			"Ahmedabad",
			"Andaman and Nicobar Islands",
			"Amritsar",
			"Bengaluru",
			"Chennai",
			"Kozhikode",
			"Delhi",
			"Goa",
			"Guwahati",
			"Hyderabad",
			"Jaipur",
			"Kolkata",
			"Kochi",
			"Mumbai",
			"Nagpur",
			"Srinagar",
			"Thiruvananthapuram",
		];

		if (isNaN(weight)) return res.status(400).send({error: `weight MUST be the type of number`});

		const sourceAirportCity = airportCities.find((city) => {
			const isSourceAirportCity = city === sourceCity;
			return isSourceAirportCity;
		});

		const destinationAirportCity = airportCities.find((city) => {
			const isDestinationAirportCity = city === destinationCity;
			return isDestinationAirportCity;
		});

		// console.log("SOURCE: ", Boolean(sourceAirportCity));
		// console.log("DESTINATION: ", Boolean(destinationAirportCity));

		const isSourceAirportCity = Boolean(sourceAirportCity);
		const isDestinationAirportCity = Boolean(destinationAirportCity);

		// console.log("IS_SOURCE: ", isSourceAirportCity);
		// console.log("IS_DESTINATION: ", isDestinationAirportCity);

		let cityCombinationType = "";
		let packingCost = isPackingRequired ? 5000 : 0;

		if (isSourceAirportCity && isDestinationAirportCity) {
			cityCombinationType = "port";

			calculateCost(cityCombinationType, weight, packingCost, res);
			cityCombinationType = "";
		} else if (
			(!isSourceAirportCity && isDestinationAirportCity) ||
			(isSourceAirportCity && !isDestinationAirportCity)
		) {
			cityCombinationType = "mixed";
			calculateCost(cityCombinationType, weight, packingCost, res);
		} else {
			cityCombinationType = "non_port";
			calculateCost(cityCombinationType, weight, packingCost, res);
		}
	} catch (error) {
		console.error(`Error while Calculating air ambulance price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating air ambulance price. Please try again later",
		});
	}
};
