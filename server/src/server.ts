import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AbhishekOS server is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "AbhishekOS server is running",
  });
});

app.get("/api/test", (_req, res) => {
  res.json({
    success: true,
    message: "Test route is working",
  });
});

app.use("/api/projects", projectsRouter);

app.listen(PORT, () => {
  console.log(`AbhishekOS server running on http://localhost:${PORT}`);
});