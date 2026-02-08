import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../models/category.models.js";

export const getCats = async (req, res) => {
  try {
    const data = await getCategories();
    // Corregido: 'data' ya contiene el array (res.rows) enviado desde el modelo
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCat = async (req, res) => {
  const { name_category, description, id_department } = req.body;

  if (!id_department) {
    return res
      .status(400)
      .json({ message: "Debe seleccionar un departamento válido" });
  }

  try {
    const result = await createCategory(
      name_category,
      description,
      id_department,
    );
    // En Postgres, como usamos RETURNING *, el resultado es la fila recién creada
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ... imports

export const updateCat = async (req, res) => {
  // CAMBIO: Debe coincidir con el nombre en el Router (/:id_category)
  const { id_category } = req.params;
  const { name_category, description, id_department } = req.body;

  try {
    // Pasamos id_category al modelo
    const result = await updateCategory(id_category, {
      name_category,
      description,
      id_department,
    });

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría actualizada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCat = async (req, res) => {
  // CAMBIO: Debe coincidir con el nombre en el Router (/:id_category)
  const { id_category } = req.params;

  try {
    const result = await deleteCategory(id_category);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
