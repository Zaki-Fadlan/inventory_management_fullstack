import reportService from "../service/report.service.js";
import { sendResponse, sendError } from "../utils/response.js";

const reportDashboard = async (req, res) => {
  console.log("Fetching report dashboard data");
  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const startDate = reqUrl.searchParams.get("startDate");
    const endDate = reqUrl.searchParams.get("endDate");

    const params = {};
    if (startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;
    }

    const report = await reportService.getAllReports(params);
    sendResponse(res, 200, "Reports retrieved successfully", report);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

export default {
  reportDashboard,
};
