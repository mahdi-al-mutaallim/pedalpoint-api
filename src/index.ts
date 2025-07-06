import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFound from "./middlewares/notFound.js";
import router from "./routes/index.js";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (_req: Request, res: Response) => {
	res
		.status(200)
		.json({ message: "Bike Servicing Management API is running!" });
});
app.use("/api", router);

// Error Handling Middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
