import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";

export const createPerson = async (req, res) => {
  try {
    const { name, Lastname } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }
    if (!Lastname || typeof Lastname !== "string" || Lastname.trim() === "") {
      return res.status(400).json({ message: "el apellido es obligatorio" });
    }
    const existente = await PersonModel.findOne({ where: { Lastname } });
    if (existente) {
      return res
        .status(400)
        .json({ message: "ya existe una persona con ese apellido" });
    }
    const nuevaPersona = await PersonModel.create({ name, Lastname });
    return res
      .status(201)
      .json({ message: "person creada", data: nuevaPersona });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al crear la persona", error: error.message });
  }
};

export const getPeople = async (req, res) => {
  try {
    const personas = await PersonModel.findAll({
      include: {
        model: UserModel,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });
    return res.status(200).json({ data: personas });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al obtener las personas", error: error.message });
  }
};
