import customerRepository from "../repository/customer.repository.js";

const customerService = {
  getAllCustomers: async () => {
    try {
      const customers = await customerRepository.getAllCustomers();
      return customers;
    } catch (error) {
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }
  },

  getCustomerById: async (customerId) => {
    try {
      const customer = await customerRepository.getCustomerById(customerId);
      if (!customer) {
        throw new Error("Customer not found");
      }
      return customer;
    } catch (error) {
      if (error.message === "Customer not found") {
        throw error;
      }
      throw new Error(
        `Failed to fetch customer with ID ${customerId}: ${error.message}`
      );
    }
  },

  createCustomer: async (customerData) => {
    try {
      if (!customerData.customer_id || !customerData.name) {
        throw new Error("Customer ID and name are required");
      }
      if (
        customerData.type &&
        !["regular", "vip", "wholesale"].includes(customerData.type)
      ) {
        throw new Error(
          "Invalid customer type. Must be 'regular', 'vip', or 'wholesale'"
        );
      }
      const newCustomer = await customerRepository.createCustomer(customerData);
      return newCustomer;
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  },

  updateCustomer: async (customerId, customerData) => {
    try {
      if (
        customerData.type &&
        !["regular", "vip", "wholesale"].includes(customerData.type)
      ) {
        throw new Error(
          "Invalid customer type. Must be 'regular', 'vip', or 'wholesale'"
        );
      }
      const updatedCustomer = await customerRepository.updateCustomer(
        customerId,
        customerData
      );
      if (!updatedCustomer) {
        throw new Error("Customer not found");
      }
      return updatedCustomer;
    } catch (error) {
      if (error.message === "Customer not found") {
        throw error;
      }
      throw new Error(
        `Failed to update customer with ID ${customerId}: ${error.message}`
      );
    }
  },

  deleteCustomer: async (customerId) => {
    try {
      const deletedCustomer = await customerRepository.deleteCustomer(
        customerId
      );
      if (!deletedCustomer) {
        throw new Error("Customer not found");
      }
      return deletedCustomer;
    } catch (error) {
      if (error.message === "Customer not found") {
        throw error;
      }
      throw new Error(
        `Failed to delete customer with ID ${customerId}: ${error.message}`
      );
    }
  },
};

export default customerService;
