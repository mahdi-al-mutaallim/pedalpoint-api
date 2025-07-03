import createRouter, { type TRouter } from "@shared/createRouter";

const router = createRouter();

type TRoute = { path: string; router: TRouter };

const module_routes: TRoute[] = [];

module_routes.forEach((route) => router.use(route.path, route.router));

export default router;
