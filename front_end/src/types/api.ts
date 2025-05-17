// API Types
export interface Category {
  id?: number;
  name: string;
}

export interface Supplier {
  id?: number;
  name: string;
  contact_info: string;
}

export interface Product {
  id?: number;
  product_id: string;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  supplier_id: number;
  category?: Category;
  supplier?: Supplier;
}

export interface Customer {
  id?: number;
  customer_id: string;
  name: string;
  type: "regular" | "vip" | "wholesale";
}

export interface Transaction {
  id?: number;
  transaction_id: string;
  product_id: string;
  quantity: number;
  type: "purchase" | "sale";
  customer_id?: string;
  timestamp: string;
}
interface topProduct {
  product_name: string;
  total_sales_rp: string;
}

interface MonthlySale {
  month: string;
  year: string;
  total_sales_rp: number;
}

interface soldPerCategory {
  category_name: string;
  total_quantity_sold: number;
  total_sales_rp: number;
  avg_sales_per_day: number;
}

export interface Report {
  topProduct: topProduct[];
  monthlySale: MonthlySale[];
  soldPerCategory: soldPerCategory[];
}

// Sample Data
export const sampleData = {
  categories: {
    description: "Sample data for creating categories",
    endpoint: "POST /categories",
    samples: [
      { name: "Electronics" },
      { name: "Computers" },
      { name: "Smartphones" },
    ],
  },
  suppliers: {
    description: "Sample data for creating suppliers",
    endpoint: "POST /suppliers",
    samples: [
      {
        name: "Tech Solutions Inc",
        contact_info:
          "123 Supply St\nPhone: 555-0123\nEmail: contact@techsolutions.com",
      },
      {
        name: "Global Electronics",
        contact_info:
          "456 Electronics Ave\nPhone: 555-0456\nEmail: sales@globalelectronics.com",
      },
      {
        name: "Digital Distributors",
        contact_info:
          "789 Digital Rd\nPhone: 555-0789\nEmail: info@digitaldist.com",
      },
    ],
  },
  products: {
    description: "Sample data for creating products",
    endpoint: "POST /products",
    samples: [
      {
        product_id: "PROD001",
        name: "Gaming Laptop",
        price: 999.99,
        stock: 10,
        category_id: 1,
        supplier_id: 1,
      },
      {
        product_id: "PROD002",
        name: "Smartphone Pro",
        price: 799.99,
        stock: 20,
        category_id: 1,
        supplier_id: 2,
      },
      {
        product_id: "PROD003",
        name: "Tablet Ultra",
        price: 599.99,
        stock: 15,
        category_id: 1,
        supplier_id: 3,
      },
    ],
  },
  customers: {
    description: "Sample data for creating customers",
    endpoint: "POST /customers",
    samples: [
      {
        customer_id: "CUST001",
        name: "John Doe",
        type: "regular",
      },
      {
        customer_id: "CUST002",
        name: "Jane Smith",
        type: "vip",
      },
      {
        customer_id: "CUST003",
        name: "Tech Corp",
        type: "wholesale",
      },
    ],
  },
  transactions: {
    description: "Sample data for creating transactions",
    endpoint: "POST /transactions",
    samples: {
      purchases: [
        {
          transaction_id: "TRX001",
          product_id: "PROD001",
          quantity: 5,
          type: "purchase",
        },
        {
          transaction_id: "TRX002",
          product_id: "PROD002",
          quantity: 10,
          type: "purchase",
        },
      ],
      sales: [
        {
          transaction_id: "TRX003",
          product_id: "PROD001",
          quantity: 2,
          type: "sale",
          customer_id: "CUST001",
        },
        {
          transaction_id: "TRX004",
          product_id: "PROD002",
          quantity: 3,
          type: "sale",
          customer_id: "CUST002",
        },
      ],
    },
  },
};
