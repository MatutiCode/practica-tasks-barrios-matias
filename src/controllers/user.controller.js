import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, person_id } = req.body;
    const nuevoUsuario = await UserModel.create({
      name,
      email,
      password,
      person_id,
    });
    return res
      .status(201)
      .json({ message: "Usuario creado", data: nuevoUsuario });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usuarios = await UserModel.findAll();
    return res.status(200).json({ data: usuarios });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ data: usuario });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const data = matchedData(req, { locations: ["body"] });
    await usuario.update(data);
    return res.status(200).json({ message: "Usuario actualizado", data: usuario });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await usuario.destroy();
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};
