## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8080
   USER_DB_USER=your_user
   USER_DB_PASSWORD=your_password
   USER_DB_HOST=localhost
   USER_DB_PORT=5432
   USER_DB_NAME=your_database
   ```

4. Set up the database tables in PostgreSQL:

    Make database at postgresql, the script at
   ```database.sql```

## Running the Application

Development mode (with auto-reload):
```bash
node run start
```

## API Endpoints

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create a new category
- `GET /categories/:id` - Get a specific category
- `PUT /categories/:id` - Update a category
- `DELETE /categories/:id` - Delete a category

### Products
- `GET /products` - Get all products (includes category information)
- `POST /products` - Create a new product
- `GET /products/:id` - Get a specific product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Customers
- `GET /customers` - Get all customers
- `POST /customers` - Create a new customer
- `GET /customers/:id` - Get a specific customer
- `PUT /customers/:id` - Update a customer
- `DELETE /customers/:id` - Delete a customer

### Suppliers
- `GET /suppliers` - Get all suppliers
- `POST /suppliers` - Create a new supplier
- `GET /suppliers/:id` - Get a specific supplier
- `PUT /suppliers/:id` - Update a supplier
- `DELETE /suppliers/:id` - Delete a supplier

### Transactions
- `GET /transactions` - Get all transactions (includes product and customer details)
- `POST /transactions` - Create a new transaction (automatically updates product stock)
- `GET /transactions/:id` - Get a specific transaction
- `DELETE /transactions/:id` - Delete a transaction (reverts stock changes)

### Reports
- `GET /report` - Get a report of the current stock levels
- `GET /report?start_date=2025-01-01&end_date=2025-05-01` Get a report of the selected range date

## Request/Response Examples

### Categories

#### Create Category
```http
POST /categories
Content-Type: application/json

{
  "name": "Electronics"
}
```

Response:
```json
{
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "name": "Electronics"
  }
}
```

### Products

#### Create Product
```http
POST /products
Content-Type: application/json

{  "product_id": "PROD001",
  "name": "Gaming Laptop",
  "price": 999.99,
  "stock": 100,
  "category_id": 1,
  "supplier_id": 1
}
```

Response:
```json
{
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "product_id": "PROD001",
    "name": "Gaming Laptop",
    "price": "999.99",
    "stock": 100,
    "category_id": 1,
    "supplier_id": 1,
    "supplier_name": "ABC Supplies",
    "supplier_contact": "123 Supply St, Business District\nPhone: 555-0123"
  }
}
```

#### Get Products
```http
GET /products
```

Response:
```json
{
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "product_id": "PROD001",
      "name": "Gaming Laptop",
      "price": "999.99",
      "stock": 100,
      "category_id": 1,
      "category_name": "Electronics"
    }
  ]
}
```

### Customers

#### Create Customer
```http
POST /customers
Content-Type: application/json

{
  "customer_id": "CUST001",
  "name": "John Doe",
  "type": "regular"
}
```

Response:
```json
{
  "message": "Customer created successfully",
  "data": {
    "id": 1,
    "customer_id": "CUST001",
    "name": "John Doe",
    "type": "regular"
  }
}
```

### Suppliers

#### Create Supplier
```http
POST /suppliers
Content-Type: application/json

{
  "name": "ABC Supplies",
  "contact_info": "123 Supply St, Business District\nPhone: 555-0123"
}
```

Response:
```json
{
  "message": "Supplier created successfully",
  "data": {
    "id": 1,
    "name": "ABC Supplies",
    "contact_info": "123 Supply St, Business District\nPhone: 555-0123"
  }
}
```

### Transactions

#### Create Transaction (Sale)
```http
POST /transactions
Content-Type: application/json

{
  "transaction_id": "TRX001",
  "product_id": "PROD001",
  "quantity": 5,
  "type": "sale",
  "customer_id": "CUST001"
}
```

Response:
```json
{
  "message": "Transaction created successfully",
  "data": {
    "id": 1,
    "transaction_id": "TRX001",
    "product_id": "PROD001",
    "quantity": 5,
    "type": "sale",
    "customer_id": "CUST001",
    "timestamp": "2025-05-17T10:30:00Z"
  }
}
```

#### Create Transaction (Purchase)
```http
POST /transactions
Content-Type: application/json

{
  "transaction_id": "TRX002",
  "product_id": "PROD001",
  "quantity": 10,
  "type": "purchase"
}
```

Response:
```json
{
  "message": "Transaction created successfully",
  "data": {
    "id": 2,
    "transaction_id": "TRX002",
    "product_id": "PROD001",
    "quantity": 10,
    "type": "purchase",
    "customer_id": "xxx",
    "timestamp": "2025-05-17T10:35:00Z"
  }
}
```

#### Get All Transactions
```http
GET /transactions
```

Response:
```json
{
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 2,
      "transaction_id": "TRX002",
      "product_id": "PROD001",
      "quantity": 10,
      "type": "purchase",
      "customer_id": null,
      "timestamp": "2025-05-17T10:35:00Z",
      "product_name": "Gaming Laptop",
      "customer_name": null
    },
    {
      "id": 1,
      "transaction_id": "TRX001",
      "product_id": "PROD001",
      "quantity": 5,
      "type": "sale",
      "customer_id": "CUST001",
      "timestamp": "2025-05-17T10:30:00Z",
      "product_name": "Gaming Laptop",
      "customer_name": "John Smith"
    }
  ]
}
```


## Data Validation

- Products: 
  - price must be >= 0
  - stock must be >= 0
  - product_id must be unique
- Customers: 
  - type must be one of: 'regular', 'vip', 'wholesale'
  - customer_id must be unique
- Transactions: 
  - quantity must be > 0
  - type must be 'purchase' or 'sale'
  - transaction_id must be unique
  - must have valid product_id
  - customer_id required for sales (optional for purchases)
  - sufficient stock must be available for sales
  - stock is automatically updated on transaction creation/deletion

## Transaction Features

### Stock Management
- Sales: decrease product stock
- Purchases: increase product stock
- Automatic stock validation prevents overselling
- Stock changes are atomic (uses database transactions)
- Stock changes are reverted if transaction is deleted
