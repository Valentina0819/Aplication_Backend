import {
  getDepartments,
  createDepartment,
  deleteDepartment,
} from "../models/department.models.js";

export const getDepts = async (req, res) => {
  try {
    const data = await getDepartments();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDept = async (req, res) => {
  try {
    const id = await createDepartment(req.body);
    res.status(201).json({ id_department: id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDept = async (req, res) => {
  try {
    await deleteDepartment(req.params.id_department);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
