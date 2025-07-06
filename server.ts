import type { Server } from "node:http";
import app from "./src/index.js";

const PORT = parseInt(process.env.PORT || "3000", 10);
export let server: Server;

(async () => {
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
})();
