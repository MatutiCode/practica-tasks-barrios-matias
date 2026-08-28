import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const createRole = async (req, res) => {
  try {
    const { rolename } = req.body;
    if (!rolename || typeof rolename !== "string" || rolename.trim() === "") {
      return res
        .status(400)
        .json({ message: "el nombre del rol es obligatorio" });
    }
    const existente = await RoleModel.findOne({ where: { rolename } });
    if (existente) {
      return res
        .status(400)
        .json({ message: "ya existe un rol con ese nombre" });
    }
    const nuevoRol = await RoleModel.create({ rolename });
    return res.status(201).json({ message: "rol creado", data: nuevoRol });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al crear el rol", error: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll({
      include: {
        model: UserModel,
        as: "users",
        attributes: ["id", "name", "email"],
        through: { attributes: [] },
      },
    });
    return res.status(200).json({ data: roles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los roles", error: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await RoleModel.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: "rol no encontrado"});
    }
    const data = matchedData(req, { locations: ["body"]});
    await rol.update(data);
    return res.status(200).json({ message: "Rol actualizado", data: rol})
  } catch (error) {
    return res.status(500).json({ message: "error al actualizar el rol", error: error.message})
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await RoleModel.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: "rol no encontrado"});
    }
    await rol.destroy();
    return res.status(200).json({ message: "rol eliminado"});
  } catch (error) {
    return res.status(500).json({ message: "error al eliminar el rol", error: error.message});
  }
};
