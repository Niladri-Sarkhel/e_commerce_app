import express from "express";

// import { handleReqErrors } from "#errors";
import { testRouter } from "#routes";

export const app = express();
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/test", testRouter)
  .use((req, res) => {
    return res.status(404).json({ message: "page not found :(" });
  });
// .use(handleReqErrors);
