import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "AbhishekOS server is running",
  });
});

app.listen(PORT, () => {
  console.log(
    `AbhishekOS server running on http://localhost:${PORT}`
  );
});