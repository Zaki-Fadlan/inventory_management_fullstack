import pool from "../config/database.js";
import logger from "../config/logger.js";

const getAllCategories = async () => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    logger.info("Fetched all categories successfully");
    return result.rows;
  } catch (error) {
    logger.error("Error fetching categories:", error);
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    logger.info(`Fetched category by ID: ${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error fetching category by ID ${id}:`, error);
    throw error;
  }
};

const createCategory = async (category) => {
  try {
    const { name } = category;
    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    logger.info(`Created new category: ${name}`);
    return result.rows[0];
  } catch (error) {
    logger.error("Error creating category:", error);
    throw error;
  }
};

const updateCategory = async (id, category) => {
  try {
    const { name } = category;
    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    logger.info(`Updated category ID: ${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating category ID ${id}:`, error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    logger.info(`Deleted category ID: ${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error deleting category ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
