import createRouter from "@shared/createRouter";
import { CustomersControllers } from "./customers.controllers";

const router = createRouter();

router.get("/", CustomersControllers.getCustomers);
router.get("/:id", CustomersControllers.getCustomerById);
router.post("/", CustomersControllers.createCustomers);
router.patch("/:id", CustomersControllers.updateCustomers);
router.delete("/:id", CustomersControllers.deleteCustomers);

export const CustomersRoutes = router;
