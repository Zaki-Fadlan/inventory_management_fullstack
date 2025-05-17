import logger from "../config/logger.js";
import transactionRepository from "../repository/transaction.repository.js";

const transactionService = {
  getAllTransactions: async () => {
    try {
      const transactions = await transactionRepository.getAllTransactions();
      return transactions;
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }
  },

  getTransactionById: async (transactionId) => {
    try {
      const transaction = await transactionRepository.getTransactionById(
        transactionId
      );
      if (!transaction) {
        throw new Error("Transaction not found");
      }
      return transaction;
    } catch (error) {
      if (error.message === "Transaction not found") {
        throw error;
      }
      throw new Error(
        `Failed to fetch transaction with ID ${transactionId}: ${error.message}`
      );
    }
  },

  createTransaction: async (transactionData) => {
    try {
      if (
        !transactionData.transaction_id ||
        !transactionData.product_id ||
        !transactionData.quantity ||
        !transactionData.type
      ) {
        throw new Error("Missing required fields");
      }

      if (!["purchase", "sale"].includes(transactionData.type)) {
        throw new Error(
          "Invalid transaction type. Must be 'purchase' or 'sale'"
        );
      }

      if (transactionData.quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }

      const newTransaction = await transactionRepository.createTransaction(
        transactionData
      );
      logger.info(
        `Created transaction ID: ${newTransaction.transaction_id}, Type: ${newTransaction.type}, Quantity: ${newTransaction.quantity}`
      );
      return newTransaction;
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  },

  deleteTransaction: async (transactionId) => {
    try {
      const deletedTransaction = await transactionRepository.deleteTransaction(
        transactionId
      );
      if (!deletedTransaction) {
        throw new Error("Transaction not found");
      }
      return deletedTransaction;
    } catch (error) {
      if (error.message === "Transaction not found") {
        throw error;
      }
      throw new Error(
        `Failed to delete transaction with ID ${transactionId}: ${error.message}`
      );
    }
  },
};

export default transactionService;
