import { RoleModel } from "../models/role.model.js";
import { UserModel } from "../models/user.model.js";

export const createRole = async (req, res) => {
  try {
    const { rolename } = req.nody;
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
