import reportRepository from "../repository/report.repository.js";

const reportService = {
  getAllReports: async (params = {}) => {
    try {
      const reports = await reportRepository.getReportTopProduct(params);
      return reports;
    } catch (error) {
      throw new Error(`Failed to fetch reports: ${error.message}`);
    }
  },
};

export default reportService;
