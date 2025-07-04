import { CustomersRoutes } from "@app/modules/customers/customers.routes";
import createRouter, { type TRouter } from "@shared/createRouter";

const router = createRouter();

type TRoute = { path: string; router: TRouter };

const module_routes: TRoute[] = [
  { path: "/customers", router: CustomersRoutes }
];

module_routes.forEach((route) => router.use(route.path, route.router));

export default router;
