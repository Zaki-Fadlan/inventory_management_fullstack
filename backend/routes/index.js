import productRoute from "./product.js";
import categoryRoute from "./category.js";
import customerRoute from "./customer.js";
import supplierRoute from "./supplier.js";
import transactionRoute from "./transaction.js";
import reportRoute from "./report.js";

const routes = {
  "/products": {
    GET: productRoute.allProduct,
    POST: productRoute.createProduct,
  },
  "/products/:id": {
    GET: productRoute.findProduct,
    PUT: productRoute.updateProduct,
    DELETE: productRoute.deleteProduct,
  },
  "/categories": {
    GET: categoryRoute.allCategories,
    POST: categoryRoute.createCategory,
  },
  "/categories/:id": {
    GET: categoryRoute.findCategory,
    PUT: categoryRoute.updateCategory,
    DELETE: categoryRoute.deleteCategory,
  },
  "/customers": {
    GET: customerRoute.allCustomers,
    POST: customerRoute.createCustomer,
  },
  "/customers/:id": {
    GET: customerRoute.findCustomer,
    PUT: customerRoute.updateCustomer,
    DELETE: customerRoute.deleteCustomer,
  },
  "/suppliers": {
    GET: supplierRoute.allSuppliers,
    POST: supplierRoute.createSupplier,
  },
  "/suppliers/:id": {
    GET: supplierRoute.findSupplier,
    PUT: supplierRoute.updateSupplier,
    DELETE: supplierRoute.deleteSupplier,
  },
  "/transactions": {
    GET: transactionRoute.allTransactions,
    POST: transactionRoute.createTransaction,
  },
  "/transactions/:id": {
    GET: transactionRoute.findTransaction,
    DELETE: transactionRoute.deleteTransaction,
  },
  "/report": {
    GET: reportRoute.reportDashboard,
  },
};

export default routes;
