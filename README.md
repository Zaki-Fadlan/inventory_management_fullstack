
## Setup

## 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Zaki-Fadlan/inventory_management_fullstack.git
cd inventory_management_fullstack
```

## 2. Run Backend
### Setup

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

## 2. Run Frontend
### Install
   ```bash
   cd front_end
   npm install
   ```
### Install
   ```bash
    npm run dev
   ```