import PackageType from "../models/packageType.js";

export const getAllPackageTypes = async (req, res, next) => {
  try {
    const packageTypes = await PackageType.find({});
    res.status(200).send(packageTypes);
  } catch (error) {
    console.error(`Error while fetching packageTypes. Details : ${error}`);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: "Error while fetching packageTypes. Please try again later" });
  }
};

export const addPackageType = async (req, res, next) => {
  const { name, code } = req.body;
  try {
    const packageType = await PackageType.create({ name, code });
    res.status(200).send(packageType);
  } catch (error) {
    console.error(`Error while creating PackageType. Details : ${error}`);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: "Error while adding PackageType. Please try again later" });
  }
};

export const removePackageType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const packageType = await PackageType.deleteOne({ _id: id });
    res.status(200).send(packageType);
  } catch (error) {
    console.error(`Error while deleting PackageType. Details : ${error}`);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: "Error while deleting PackageType. Please try again later" });
  }
};
