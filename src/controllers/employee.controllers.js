import { pool } from "../db.js";
import {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
} from "../models/employee.models.js";

export const getEmployeeCont = async (req, res) => {
  try {
    const rows = await getEmployee();
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving employees" });
  }
};

export const getEmployeeByIdCont = async (req, res) => {
  try {
    const employee = await getEmployeeById(req, res);
    if (!employee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving employee" });
  }
};

export const createEmployeeCont = async (req, res) => {
  try {
    const employee = await createEmployee(req, res);
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating employee" });
  }
};

export const updateEmployeeCont = async (req, res) => {
  try {
    const updated = await updateEmployee(req, res);
    if (!updated) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({
      message: "Empleado actualizado correctamente",
      employee: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating employee" });
  }
};

export const patchEmployeeCont = async (req, res) => {
  try {
    const updated = await patchEmployee(req, res);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error patching employee" });
  }
};

export const deleteEmployeeCont = async (req, res) => {
  try {
    const deleted = await deleteEmployee(req, res);
    if (deleted === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ message: "Empleado eliminado permanentemente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting employee" });
  }
};
