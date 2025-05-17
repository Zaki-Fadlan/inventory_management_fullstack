import pool from "../config/database.js";
import logger from "../config/logger.js";

const getAllCustomers = async () => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    logger.info("Fetched all customers successfully");
    return result.rows;
  } catch (error) {
    logger.error("Error fetching customers:", error);
    throw error;
  }
};

const getCustomerById = async (customerId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [customerId]
    );
    logger.info(`Fetched customer by ID: ${customerId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error fetching customer by ID ${customerId}:`, error);
    throw error;
  }
};

const createCustomer = async (customer) => {
  try {
    const { customer_id, name, type } = customer;
    const result = await pool.query(
      "INSERT INTO customers (customer_id, name, type) VALUES ($1, $2, $3) RETURNING *",
      [customer_id, name, type]
    );
    logger.info(`Created new customer: ${name}`);
    return result.rows[0];
  } catch (error) {
    logger.error("Error creating customer:", error);
    throw error;
  }
};

const updateCustomer = async (customerId, customer) => {
  try {
    const { name, type } = customer;
    const result = await pool.query(
      "UPDATE customers SET name = $1, type = $2 WHERE customer_id = $3 RETURNING *",
      [name, type, customerId]
    );
    logger.info(`Updated customer ID: ${customerId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating customer ID ${customerId}:`, error);
    throw error;
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE customer_id = $1 RETURNING *",
      [customerId]
    );
    logger.info(`Deleted customer ID: ${customerId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error deleting customer ID ${customerId}:`, error);
    throw error;
  }
};

export default {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
