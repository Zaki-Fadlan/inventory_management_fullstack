import { sendResponse, sendError } from "../utils/response.js";
import supplierService from "../service/supplier.service.js";

const allSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    sendResponse(res, 200, "Suppliers retrieved successfully", suppliers);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = req.body;
    const updatedSupplier = await supplierService.updateSupplier(id, supplier);
    sendResponse(res, 200, "Supplier updated successfully", updatedSupplier);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const findSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await supplierService.getSupplierById(id);
    sendResponse(res, 200, "Supplier found", supplier);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await supplierService.deleteSupplier(id);
    sendResponse(res, 200, "Supplier deleted successfully", supplier);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const createSupplier = async (req, res) => {
  try {
    const supplier = req.body;
    const newSupplier = await supplierService.createSupplier(supplier);
    sendResponse(res, 201, "Supplier created successfully", newSupplier);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

export default {
  allSuppliers,
  updateSupplier,
  findSupplier,
  deleteSupplier,
  createSupplier,
};
