import supplierRepository from "../repository/supplier.repository.js";

const supplierService = {
  getAllSuppliers: async () => {
    try {
      const suppliers = await supplierRepository.getAllSuppliers();
      return suppliers;
    } catch (error) {
      throw new Error(`Failed to fetch suppliers: ${error.message}`);
    }
  },

  getSupplierById: async (id) => {
    try {
      const supplier = await supplierRepository.getSupplierById(id);
      if (!supplier) {
        throw new Error("Supplier not found");
      }
      return supplier;
    } catch (error) {
      if (error.message === "Supplier not found") {
        throw error;
      }
      throw new Error(
        `Failed to fetch supplier with ID ${id}: ${error.message}`
      );
    }
  },

  createSupplier: async (supplierData) => {
    try {
      if (!supplierData.name) {
        throw new Error("Supplier name is required");
      }
      const newSupplier = await supplierRepository.createSupplier(supplierData);
      return newSupplier;
    } catch (error) {
      throw new Error(`Failed to create supplier: ${error.message}`);
    }
  },

  updateSupplier: async (id, supplierData) => {
    try {
      const updatedSupplier = await supplierRepository.updateSupplier(
        id,
        supplierData
      );
      if (!updatedSupplier) {
        throw new Error("Supplier not found");
      }
      return updatedSupplier;
    } catch (error) {
      if (error.message === "Supplier not found") {
        throw error;
      }
      throw new Error(
        `Failed to update supplier with ID ${id}: ${error.message}`
      );
    }
  },

  deleteSupplier: async (id) => {
    try {
      const deletedSupplier = await supplierRepository.deleteSupplier(id);
      if (!deletedSupplier) {
        throw new Error("Supplier not found");
      }
      return deletedSupplier;
    } catch (error) {
      if (error.message === "Supplier not found") {
        throw error;
      }
      throw new Error(
        `Failed to delete supplier with ID ${id}: ${error.message}`
      );
    }
  },
};

export default supplierService;
