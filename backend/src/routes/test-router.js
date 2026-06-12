import express from "express";

const testController = {
  ping: (req, res) => {
    res.status(200).json({
      status: "success",
      message: "🏓 pong!",
      timestamp: new Date().toISOString(),
    });
  },

  echo: (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Data received successfully",
      receivedBody: req.body,
      receivedHeaders: req.headers,
    });
  },

  asyncTest: async (req, res) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      res.status(200).json({
        status: "success",
        message: "Async event loop and connections are working fine.",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

export const testRouter = express.Router();

testRouter
  .get("/ping", testController.ping)
  .post("/echo", testController.echo)
  .get("/async", testController.asyncTest);
