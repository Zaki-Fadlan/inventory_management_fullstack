import pool from "../config/database.js";
import logger from "../config/logger.js";

const getAllSuppliers = async () => {
  try {
    const result = await pool.query("SELECT * FROM suppliers");
    logger.info("Fetched all suppliers successfully");
    return result.rows;
  } catch (error) {
    logger.error("Error fetching suppliers:", error);
    throw error;
  }
};

const getSupplierById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM suppliers WHERE id = $1", [
      id,
    ]);
    logger.info(`Fetched supplier by ID: ${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error fetching supplier by ID ${id}:`, error);
    throw error;
  }
};

const createSupplier = async (supplier) => {
  try {
    const { name, contact_info } = supplier;
    const result = await pool.query(
      "INSERT INTO suppliers (name, contact_info) VALUES ($1, $2) RETURNING *",
      [name, contact_info]
    );
    logger.info(`Created new supplier: ${name}`);
    return result.rows[0];
  } catch (error) {
    logger.error("Error creating supplier:", error);
    throw error;
  }
};

const updateSupplier = async (id, supplier) => {
  try {
    const { name, contact_info } = supplier;
    const result = await pool.query(
      "UPDATE suppliers SET name = $1, contact_info = $2 WHERE id = $3 RETURNING *",
      [name, contact_info, id]
    );
    logger.info(`Updated supplier ID: ${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating supplier ID ${id}:`, error);
    throw error;
  }
};

const deleteSupplier = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM suppliers WHERE id = $1 RETURNING *",
      [id]
    );
    logger.info(`Deleted supplier ID: ${id}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error deleting supplier ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
