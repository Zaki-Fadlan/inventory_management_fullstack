import { sendResponse, sendError } from "../utils/response.js";
import productService from "../service/product.service.js";

const allProduct = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    sendResponse(res, 200, "Products retrieved successfully", products);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    const updatedProduct = await productService.updateProduct(id, product);
    sendResponse(res, 200, "Product updated successfully", updatedProduct);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const findProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    sendResponse(res, 200, "Product found", product);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.deleteProduct(id);
    sendResponse(res, 200, "Product deleted successfully", product);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productService.createProduct(product);
    sendResponse(res, 201, "Product created successfully", newProduct);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

export default {
  allProduct,
  updateProduct,
  findProduct,
  deleteProduct,
  createProduct,
};
