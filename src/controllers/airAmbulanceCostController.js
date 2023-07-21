import AirAmbulanceCost from "../models/airAmbulanceCost.js";

export const addAirAmbulanceCost = async (req, res, next) => {
  const { data } = req.body;
  //   const { cityCombinationType, minWeight, maxWeight, rate } = req.body;
  try {
    const docs = data.map((item) => {
      const { cityCombinationType, minWeight, maxWeight, rate } = item;
      return { cityCombinationType, minWeight, maxWeight, rate };
    });
    const airAmbulanceCost = await AirAmbulanceCost.insertMany(docs);
    res.status(200).send(airAmbulanceCost);
  } catch (error) {
    console.error(`Error while creating airAmbulanceCost. Details : ${error}`);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: "Error while adding airAmbulanceCost. Please try again later" });
  }
};
