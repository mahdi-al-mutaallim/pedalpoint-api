import { Router } from "express";

const router = Router();

type TRoute = { path: string; router: Router };

const module_routes: TRoute[] = [];

module_routes.forEach((route) => router.use(route.path, route.router));

export default router;
