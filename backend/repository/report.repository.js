import pool from "../config/database.js";
import logger from "../config/logger.js";

const getReportTopProduct = async ({ startDate, endDate }) => {
  try {
    let dateFilter = "";

    if (startDate && endDate) {
      dateFilter = `AND t.timestamp BETWEEN $1 AND $2`;
    }
    const result = await pool.query(
      `
      SELECT 
        p.name AS product_name,
        p.product_id,
        COALESCE(SUM(t.quantity * p.price), 0) AS total_sales_rp,
        COALESCE(SUM(t.quantity), 0) AS units_sold
      FROM transactions t
      JOIN products p ON p.product_id = t.product_id
      WHERE t.type = 'sale'
      ${dateFilter}
      GROUP BY p.name, p.product_id
      ORDER BY total_sales_rp DESC, units_sold DESC
      LIMIT 10
    `,
      startDate && endDate ? [startDate, endDate] : []
    );

    const monthlyResult = await pool.query(
      `
      SELECT TO_CHAR(DATE_TRUNC('month', t.timestamp), 'Month') AS month,
             EXTRACT(YEAR FROM t.timestamp) AS year,
             COALESCE(SUM(t.quantity * p.price), 0) AS total_sales_rp
      FROM transactions t
      JOIN products p ON p.product_id = t.product_id
      WHERE t.type = 'sale'
      ${dateFilter} 
      GROUP BY 
        DATE_TRUNC('month', t.timestamp),
        EXTRACT(YEAR FROM t.timestamp)
      ORDER BY 
        EXTRACT(YEAR FROM t.timestamp),
        DATE_TRUNC('month', t.timestamp)
    `,
      startDate && endDate ? [startDate, endDate] : []
    );

    const categoryResult = await pool.query(
      `
      SELECT c.name AS category_name,
             COALESCE(SUM(t.quantity * p.price), 0) AS total_sales_rp
      FROM transactions t
      JOIN products p ON p.product_id = t.product_id
      JOIN categories c ON p.category_id = c.id
      WHERE t.type = 'sale'
      ${dateFilter}
      GROUP BY c.name
      ORDER BY total_sales_rp DESC
    `,
      startDate && endDate ? [startDate, endDate] : []
    );

    const formatSales = (salesValue) => {
      const value = Number(salesValue);
      if (isNaN(value)) {
        logger.warn(`Invalid sales value: ${salesValue}`);
        return "0.00";
      }
      return value.toFixed(2);
    };

    logger.debug("Top Product Data: ", result.rows);
    logger.debug("Monthly Sales Data: ", monthlyResult.rows);
    logger.debug("Sales Per Category Data: ", categoryResult.rows);

    const topProduct = result.rows.map((row) => ({
      product_name: row.product_name,
      total_sales_rp: formatSales(row.total_sales_rp),
    }));
    const monthlySale = monthlyResult.rows.map((row) => ({
      month: row.month.trim(),
      year: row.year,
      total_sales_rp: formatSales(row.total_sales_rp),
    }));

    const soldPerCategory = categoryResult.rows.map((row) => ({
      category_name: row.category_name,
      total_sales_rp: formatSales(row.total_sales_rp),
    }));

    return {
      topProduct,
      monthlySale,
      soldPerCategory,
    };
  } catch (error) {
    logger.error("Error fetching report:", error);
    throw error;
  }
};

export default {
  getReportTopProduct,
};
