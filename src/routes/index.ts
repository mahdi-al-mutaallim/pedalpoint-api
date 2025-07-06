import { BikesRoutes } from "../modules/bikes/bikes.routes.js";
import { CustomersRoutes } from "../modules/customers/customers.routes.js";
import { ServiceRecordsRoutes } from "../modules/service_records/service_records.routes.js";
import createRouter, { type TRouter } from "../shared/createRouter.js";

const router = createRouter();

type TRoute = { path: string; router: TRouter };

const moduleRoutes: TRoute[] = [
	{ path: "/customers", router: CustomersRoutes },
	{ path: "/bikes", router: BikesRoutes },
	{ path: "/services", router: ServiceRecordsRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
