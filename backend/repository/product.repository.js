import pool from "../config/database.js";
import logger from "../config/logger.js";

const getAllProducts = async () => {
  try {
    const result = await pool.query(`
      SELECT p.*, 
             c.name as category_name,
             s.name as supplier_name,
             s.contact_info as supplier_contact 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN suppliers s ON p.supplier_id = s.id
    `);
    logger.info("Fetched all products successfully");
    return result.rows;
  } catch (error) {
    logger.error("Error fetching products:", error);
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const result = await pool.query(
      `
      SELECT p.*, 
             c.name as category_name,
             s.name as supplier_name,
             s.contact_info as supplier_contact
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      WHERE p.product_id = $1
    `,
      [productId]
    );
    logger.info(`Fetched product by ID: ${productId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error fetching product by ID ${productId}:`, error);
    throw error;
  }
};

const createProduct = async (product) => {
  try {
    const { product_id, name, price, stock, category_id, supplier_id } =
      product;
    const result = await pool.query(
      `INSERT INTO products (product_id, name, price, stock, category_id, supplier_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [product_id, name, price, stock, category_id, supplier_id]
    );
    logger.info(`Created new product: ${name}`);
    return result.rows[0];
  } catch (error) {
    logger.error("Error creating product:", error);
    throw error;
  }
};

const updateProduct = async (productId, product) => {
  try {
    const { name, price, stock, category_id, supplier_id } = product;
    const result = await pool.query(
      `UPDATE products 
       SET name = $1, price = $2, stock = $3, category_id = $4, supplier_id = $5
       WHERE product_id = $6 
       RETURNING *`,
      [name, price, stock, category_id, supplier_id, productId]
    );
    logger.info(`Updated product ID: ${productId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating product ID ${productId}:`, error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [productId]
    );
    logger.info(`Deleted product ID: ${productId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error deleting product ID ${productId}:`, error);
    throw error;
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
