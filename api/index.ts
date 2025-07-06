import { createServer } from "node:http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/index.js";

const server = createServer(app);

export default function handler(req: VercelRequest, res: VercelResponse) {
	server.emit("request", req, res);
}
