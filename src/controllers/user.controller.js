import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }
    if (name.length > 100) {
      return res
        .status(400)
        .json({ message: "El nombre no puede superar los 100 caracteres" });
    }
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ message: "El email es obligatorio" });
    }
    if (email.length > 100) {
      return res
        .status(400)
        .json({ message: "El email no puede superar los 100 caracteres" });
    }
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }
    if (password.length > 100) {
      return res
        .status(400)
        .json({ message: "La contraseña no puede superar los 100 caracteres" });
    }
    const emailExistente = await User.findOne({ where: { email } });
    if (emailExistente) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese email" });
    }
    const nuevoUsuario = await User.create({ name, email, password });
    return res
      .status(201)
      .json({ message: "Usuario creado", data: nuevoUsuario });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error });
  }
};

export const getUser = async (req, res) => {
  try {
    const usuarios = await User.findAll();
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
    const usuario = await User.findByPk(id);
    if (usuario) {
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
    const { name, email, password } = req.body;

    const usuario = await User.findByPk(id);
    if (usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "" || name.length > 100) {
        return res.status(400).json({ message: "Nombre invalido" });
      }
    }
    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        email.trim() === "" ||
        email.length > 100
      ) {
        return res
          .status(400)
          .json({ message: "Ya existe otro usuario con ese email" });
      }
    }
    if (password !== undefined) {
      if (
        typeof password !== "string" ||
        password.trim() === "" ||
        password.length > 100
      ) {
        return res.status(400).json({ message: "Contraseña invalida" });
      }
    }

    await usuario.update({ name, email, password });
    return res
      .status(200)
      .json({ message: "Usuario actualizado", data: usuario });
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
    const usuario = await User.findByPk(id);
    if (usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    await usuario.destroy();
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};
