import Vehicle from "../models/vehicle.js";

export const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).send(vehicles);
  } catch (error) {
    console.error(`Error while fetching vehicles. Details : ${error}`);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: "Error while fetching vehicles. Please try again later" });
  }
};

export const addVehicle = async (req, res, next) => {
  const { name, length, width, height, imageUrl } = req.body;
  try {
    const vehicle = await Vehicle.create({ name, length, width, height, imageUrl });
    res.status(200).send(vehicle);
  } catch (error) {
    console.error(`Error while creating vehicle. Details : ${error}`);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: "Error while adding vehicle. Please try again later" });
  }
};

export const removeVehicle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.deleteOne({ _id: id });
    res.status(200).send(vehicle);
  } catch (error) {
    console.error(`Error while deleting vehicle. Details : ${error}`);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: "Error while deleting vehicle. Please try again later" });
  }
};
