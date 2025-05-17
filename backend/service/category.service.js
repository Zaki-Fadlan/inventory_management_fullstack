import categoryRepository from "../repository/category.repository.js";

const categoryService = {
  getAllCategories: async () => {
    try {
      const categories = await categoryRepository.getAllCategories();
      return categories;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  },

  getCategoryById: async (id) => {
    try {
      const category = await categoryRepository.getCategoryById(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      if (error.message === "Category not found") {
        throw error;
      }
      throw new Error(
        `Failed to fetch category with ID ${id}: ${error.message}`
      );
    }
  },

  createCategory: async (categoryData) => {
    try {
      if (!categoryData.name) {
        throw new Error("Category name is required");
      }
      const newCategory = await categoryRepository.createCategory(categoryData);
      return newCategory;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const updatedCategory = await categoryRepository.updateCategory(
        id,
        categoryData
      );
      if (!updatedCategory) {
        throw new Error("Category not found");
      }
      return updatedCategory;
    } catch (error) {
      if (error.message === "Category not found") {
        throw error;
      }
      throw new Error(
        `Failed to update category with ID ${id}: ${error.message}`
      );
    }
  },

  deleteCategory: async (id) => {
    try {
      const deletedCategory = await categoryRepository.deleteCategory(id);
      if (!deletedCategory) {
        throw new Error("Category not found");
      }
      return deletedCategory;
    } catch (error) {
      if (error.message === "Category not found") {
        throw error;
      }
      throw new Error(
        `Failed to delete category with ID ${id}: ${error.message}`
      );
    }
  },
};

export default categoryService;
