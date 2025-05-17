import pool from "../config/database.js";
import logger from "../config/logger.js";

const getAllTransactions = async () => {
  try {
    const result = await pool.query(`
      SELECT t.*, p.name as product_name, c.name as customer_name 
      FROM transactions t
      LEFT JOIN products p ON t.product_id = p.product_id
      LEFT JOIN customers c ON t.customer_id = c.customer_id
      ORDER BY t.timestamp DESC`);
    logger.info("Fetched all transactions successfully");
    return result.rows;
  } catch (error) {
    logger.error("Error fetching transactions:", error);
    throw error;
  }
};

const getTransactionById = async (transactionId) => {
  try {
    const result = await pool.query(
      `
      SELECT t.*, p.name as product_name, c.name as customer_name 
      FROM transactions t
      LEFT JOIN products p ON t.product_id = p.product_id
      LEFT JOIN customers c ON t.customer_id = c.customer_id
      WHERE t.transaction_id = $1`,
      [transactionId]
    );
    logger.info(`Fetched transaction by ID: ${transactionId}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error fetching transaction by ID ${transactionId}:`, error);
    throw error;
  }
};

const createTransaction = async (transaction) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const productResult = await client.query(
      "SELECT stock FROM products WHERE product_id = $1 FOR UPDATE",
      [transaction.product_id]
    );

    if (!productResult.rows[0]) {
      throw new Error("Product not found");
    }

    const currentStock = productResult.rows[0].stock;
    let newStock;

    if (transaction.type === "sale") {
      if (currentStock < transaction.quantity) {
        throw new Error("Insufficient stock");
      }
      newStock = currentStock - transaction.quantity;
    } else {
      newStock = currentStock + transaction.quantity;
    }

    await client.query("UPDATE products SET stock = $1 WHERE product_id = $2", [
      newStock,
      transaction.product_id,
    ]);

    const result = await client.query(
      `INSERT INTO transactions 
       (transaction_id, product_id, quantity, type, customer_id, timestamp) 
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) 
       RETURNING *`,
      [
        transaction.transaction_id,
        transaction.product_id,
        transaction.quantity,
        transaction.type,
        transaction.customer_id,
      ]
    );

    await client.query("COMMIT");
    logger.info(`Created new transaction: ${transaction.transaction_id}`);
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Error creating transaction:", error);
    throw error;
  } finally {
    client.release();
  }
};

const deleteTransaction = async (transactionId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const transactionResult = await client.query(
      "SELECT * FROM transactions WHERE transaction_id = $1",
      [transactionId]
    );

    if (!transactionResult.rows[0]) {
      throw new Error("Transaction not found");
    }

    const transaction = transactionResult.rows[0];

    const stockChange =
      transaction.type === "sale"
        ? transaction.quantity
        : -transaction.quantity;

    await client.query(
      "UPDATE products SET stock = stock + $1 WHERE product_id = $2",
      [stockChange, transaction.product_id]
    );

    const result = await client.query(
      "DELETE FROM transactions WHERE transaction_id = $1 RETURNING *",
      [transactionId]
    );

    await client.query("COMMIT");
    logger.info(`Deleted transaction ID: ${transactionId}`);
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(`Error deleting transaction ID ${transactionId}:`, error);
    throw error;
  } finally {
    client.release();
  }
};

export default {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
};
