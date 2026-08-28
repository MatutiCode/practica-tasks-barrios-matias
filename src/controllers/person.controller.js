import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

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

export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await PersonModel.findByPk(id);
    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    const data = matchedData(req, { locations: ["body"] });
    await persona.update(data);
    return res.status(200).json({ message: "Persona actualizada", data: persona });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar la persona", error: error.message });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await PersonModel.findByPk(id);
    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }
    await persona.destroy();
    return res.status(200).json({ message: "Persona eliminada" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar la persona", error: error.message });
  }
};
