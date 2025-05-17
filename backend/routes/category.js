import { sendResponse, sendError } from "../utils/response.js";
import categoryService from "../service/category.service.js";

const allCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    sendResponse(res, 200, "Categories retrieved successfully", categories);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = req.body;
    const updatedCategory = await categoryService.updateCategory(id, category);
    sendResponse(res, 200, "Category updated successfully", updatedCategory);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const findCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryService.getCategoryById(id);
    sendResponse(res, 200, "Category found", category);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryService.deleteCategory(id);
    sendResponse(res, 200, "Category deleted successfully", category);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = await categoryService.createCategory(category);
    sendResponse(res, 201, "Category created successfully", newCategory);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

export default {
  allCategories,
  updateCategory,
  findCategory,
  deleteCategory,
  createCategory,
};
