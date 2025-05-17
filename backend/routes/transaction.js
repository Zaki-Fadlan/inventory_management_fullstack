import { sendResponse, sendError } from "../utils/response.js";
import transactionService from "../service/transaction.service.js";

const allTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    sendResponse(res, 200, "Transactions retrieved successfully", transactions);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const findTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await transactionService.getTransactionById(
      transactionId
    );
    sendResponse(res, 200, "Transaction found", transaction);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const createTransaction = async (req, res) => {
  try {
    const newTransaction = await transactionService.createTransaction(req.body);
    sendResponse(res, 201, "Transaction created successfully", newTransaction);
  } catch (error) {
    let statusCode = 500;
    if (
      error.message.includes("Missing required fields") ||
      error.message.includes("Invalid transaction type") ||
      error.message.includes("Quantity must be greater than 0")
    ) {
      statusCode = 400;
    } else if (error.message.includes("Insufficient stock")) {
      statusCode = 422;
    }
    sendError(res, statusCode, error.message);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await transactionService.deleteTransaction(
      transactionId
    );
    sendResponse(res, 200, "Transaction deleted successfully", transaction);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

export default {
  allTransactions,
  findTransaction,
  createTransaction,
  deleteTransaction,
};
