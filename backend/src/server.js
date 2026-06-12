// server.js
import http from "node:http"; // Use standard node: prefix

import { app } from "#app";
import { env } from "#config";

const httpServer = http.createServer(app);

httpServer.on("listening", () => {
  console.log({ service: "auth" }, "NODE_LOKI_TEST");
  console.log(`${env.APP_NAME} server running at ${env.APP_URL}`);
});

httpServer.on("error", (error) => {
  if (error.syscall !== "listen") {
    console.log({ err: error }, "Server runtime error encountered");
    process.exit(1);
  }

  switch (error.code) {
    case "EADDRINUSE":
      console.log({ port: env.PORT }, `Port ${env.PORT} is already in use`);
      break;
    case "EACCES":
      console.log(
        { port: env.PORT },
        `Port ${env.PORT} requires elevated privileges`,
      );
      break;
    default:
      console.log({ err: error }, "Failed to start server due to system error");
  }
  process.exit(1);
});

let isShuttingDown = false;

function shutdown(signalOrError) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(
    `Received ${signalOrError || "shutdown signal"}. Closing active connections...`,
  );

  const forceQuitTimeout = setTimeout(() => {
    console.log(
      "Forced shutdown initiated: Active connections did not close in time.",
    );
    process.exit(1);
  }, 10000);

  httpServer.close((err) => {
    clearTimeout(forceQuitTimeout);
    if (err) {
      console.log({ err }, "Error occurred while closing HTTP server");
      process.exit(1);
    }
    logger.info("HTTP server closed cleanly. Process exiting.");
    process.exit(0);
  });
}

// --- 3. Process Safety Guardrails ---

process.on("uncaughtException", (error) => {
  console.log({ err: error }, `Uncaught Exception caught: ${error.message}`);
  shutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  console.log({ err: reason }, `Unhandled Promise Rejection caught`);
  shutdown("unhandledRejection");
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

const startServer = async () => {
  try {
    // await config.connectMongoDB(env.TEST_DB_URL);

    httpServer.listen(env.PORT, env.APP_URL);
  } catch (error) {
    console.log({ err: error }, "Failed to initialize server requirements");
    process.exit(1);
  }
};

startServer();
