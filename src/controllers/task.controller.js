import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";
import { PersonModel } from "../models/person.model.js";
import { matchedData } from "express-validator";


export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = req.body;

    const nuevaTarea = await TaskModel.create({
      title,
      description,
      isComplete,
      user_id,
    });
    return res.status(201).json({ message: "Tarea creada", data: nuevaTarea });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear la tarea", error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author",
          include: [
            {
              model: PersonModel,
              as: "owner",
            },
          ],
        },
      ],
    });
    return res.status(200).json({ data: tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tareas = await TaskModel.findAll();
    return res.status(200).json({ data: tareas });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las tareas", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await TaskModel.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json({ data: tarea });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener la tarea", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await TaskModel.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const data = matchedData(req, { locations: ["body"] });
    await tarea.update(data);
    return res.status(200).json({ message: "Tarea actualizada", data: tarea });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await TaskModel.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await tarea.destroy();
    return res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar la tarea", error: error.message });
  }
};
