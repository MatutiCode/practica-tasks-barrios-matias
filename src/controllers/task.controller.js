import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, inComplete } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "El titulo es obligatorio" });
    }
    if (title.length > 100) {
      return res
        .status(400)
        .json({ message: "El titulo no puede superar los 100 caracteres" });
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim === ""
    ) {
      return res.status(400).json({ message: "La descripción es obligatoria" });
    }
    if (description.length > 100) {
      return res.status(400).json({
        message: "La descripción no puede superar los 100 caracteres",
      });
    }
    if (isComplete !== undefined && typeof isComplete !== "boolean") {
      return res
        .status(400)
        .json({ message: "isComplete debe ser un valor booleano" });
    }

    const existeTitle = await Task.findOne({ where: { title } });
    if (existeTitle) {
      return res
        .status(400)
        .json({ message: "Ya existe una tarea con este titulo" });
    }

    const nuevaTarea = await Task.create({ title, description, isComplete });
    return res.status(201).json({ message: "Tarea creada", data: nuevaTarea });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear la tarea", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tareas = await Task.findAll();
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
    const tarea = await Task.findByPk(id);

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
    const { title, description, isComplete } = req.body;

    const tarea = await Task.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        title.trim() === "" ||
        title.length > 100
      ) {
        return res.status(400).json({ message: "Titulo invalido" });
      }
      const existeTitle = await Task.findOne({ where: { title } });
      if (existeTitle && existeTitle.id !== tarea.id) {
        return res
          .status(400)
          .json({ message: "Ya existe otra tarea con ese titulo" });
      }
    }
    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        description.trim() === "" ||
        description.length > 100
      ) {
        return res.status(400).json({ message: "Descripción invalida" });
      }
    }
    if (isComplete !== undefined && typeof isComplete !== "boolean") {
      return res
        .status(400)
        .json({ message: "isComplete debe ser un valor booleano" });
    }

    await tarea.update({ title, description, isComplete });
    return res.status(200).json({ message: "Tarea actualizada", data: tarea });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualziar", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Task.findByPk(id);

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
