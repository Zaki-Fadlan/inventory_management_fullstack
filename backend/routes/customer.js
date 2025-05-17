import { sendResponse, sendError } from "../utils/response.js";
import customerService from "../service/customer.service.js";

const allCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    sendResponse(res, 200, "Customers retrieved successfully", customers);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = req.body;
    const updatedCustomer = await customerService.updateCustomer(
      customerId,
      customer
    );
    sendResponse(res, 200, "Customer updated successfully", updatedCustomer);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const findCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await customerService.getCustomerById(customerId);
    sendResponse(res, 200, "Customer found", customer);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await customerService.deleteCustomer(customerId);
    sendResponse(res, 200, "Customer deleted successfully", customer);
  } catch (error) {
    sendError(
      res,
      error.message.includes("not found") ? 404 : 500,
      error.message
    );
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const newCustomer = await customerService.createCustomer(customer);
    sendResponse(res, 201, "Customer created successfully", newCustomer);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

export default {
  allCustomers,
  updateCustomer,
  findCustomer,
  deleteCustomer,
  createCustomer,
};
