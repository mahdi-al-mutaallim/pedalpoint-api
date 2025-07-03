import "./paths";
import globalErrorHandler from "@app/middlewares/globalErrorHandler";
import notFound from "@app/middlewares/notFound";
import router from "@app/routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application, type Request, type Response } from "express";
import type { Server } from "http";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Bike Servicing Management API is running!" });
});
app.use("/api", router);

// Error Handling Middleware
app.use(globalErrorHandler);
app.use(notFound);

// Server
const PORT = parseInt(process.env["PORT"] || "3000", 10);
export let server: Server;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`  Server is running on http://localhost:${PORT}`);
    });

    // Optional: Graceful shutdown
    const shutdown = () => {
      console.log("  Gracefully shutting down...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
