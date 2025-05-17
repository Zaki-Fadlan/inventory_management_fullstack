export const sendResponse = (res, statusCode, message, data) => {
  const response = {
    message: message,
    data: data,
  };

  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(response));
};

export const sendError = (res, statusCode, message) => {
  const response = {
    error: message,
  };

  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(response));
};
