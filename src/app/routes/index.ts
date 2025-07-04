import { BikesRoutes } from "@app/modules/bikes/bikes.routes";
import { CustomersRoutes } from "@app/modules/customers/customers.routes";
import { ServiceRecordsRoutes } from "@app/modules/service_records/service_records.routes";
import createRouter, { type TRouter } from "@shared/createRouter";

const router = createRouter();

type TRoute = { path: string; router: TRouter };

const moduleRoutes: TRoute[] = [
	{ path: "/customers", router: CustomersRoutes },
	{ path: "/bikes", router: BikesRoutes },
	{ path: "/services", router: ServiceRecordsRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
