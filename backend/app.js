import http from "http";
import url from "url";
import { sendResponse, sendError } from "./utils/response.js";
import logger from "./config/logger.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

// Helper functions for route handling
function isRouteMatch(routePattern, pathname) {
  const routeParts = routePattern.split("/");
  const pathParts = pathname.split("/");

  if (routeParts.length !== pathParts.length) {
    return false;
  }

  return routeParts.every((part, i) => {
    return part.startsWith(":") || part === pathParts[i];
  });
}

function extractParams(routePattern, pathname) {
  const params = {};
  const routeParts = routePattern.split("/");
  const pathParts = pathname.split("/");

  routeParts.forEach((part, i) => {
    if (part.startsWith(":")) {
      const paramName = part.slice(1);
      params[paramName] = pathParts[i];
    }
  });

  return params;
}

function handleRoute(req, res, pathname, method) {
  if (routes[pathname] && routes[pathname][method]) {
    routes[pathname][method](req, res);
    return;
  }

  for (const route in routes) {
    if (isRouteMatch(route, pathname)) {
      const params = extractParams(route, pathname);
      req.params = params;
      if (routes[route][method]) {
        routes[route][method](req, res);
        return;
      }
    }
  }

  sendResponse(res, 404, "Page not found", null);
}

const app = http.createServer((req, res) => {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;
  const method = req.method;

  if (method === "POST" || method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
        handleRoute(req, res, pathname, method);
      } catch (error) {
        sendError(res, 400, "Invalid JSON body");
      }
    });
  } else {
    handleRoute(req, res, pathname, method);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
