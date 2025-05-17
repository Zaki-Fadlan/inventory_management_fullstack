import productRepository from "../repository/product.repository.js";
const productService = {
  getAllProducts: async () => {
    try {
      const products = await productRepository.getAllProducts();
      return products;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },
  getProductById: async (id) => {
    try {
      const product = await productRepository.getProductById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      if (error.message === "Product not found") {
        throw error;
      }
      throw new Error(
        `Failed to fetch product with ID ${id}: ${error.message}`
      );
    }
  },
  createProduct: async (productData) => {
    try {
      if (
        !productData.product_id ||
        !productData.name ||
        !productData.price ||
        productData.stock === undefined ||
        !productData.category_id ||
        !productData.supplier_id
      ) {
        throw new Error(
          "Product ID, name, price, stock, category ID, and supplier ID are required"
        );
      }
      if (productData.price < 0) {
        throw new Error("Price must be non-negative");
      }
      if (productData.stock < 0) {
        throw new Error("Stock must be non-negative");
      }
      const newProduct = await productRepository.createProduct(productData);
      return newProduct;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },
  updateProduct: async (id, productData) => {
    try {
      const updatedProduct = await productRepository.updateProduct(
        id,
        productData
      );
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
      return updatedProduct;
    } catch (error) {
      if (error.message === "Product not found") {
        throw error;
      }
      throw new Error(
        `Failed to update product with ID ${id}: ${error.message}`
      );
    }
  },
  deleteProduct: async (id) => {
    try {
      const deletedProduct = await productRepository.deleteProduct(id);
      if (!deletedProduct) {
        throw new Error("Product not found");
      }
      return deletedProduct;
    } catch (error) {
      if (error.message === "Product not found") {
        throw error;
      }
      throw new Error(
        `Failed to delete product with ID ${id}: ${error.message}`
      );
    }
  },
};
export default productService;
