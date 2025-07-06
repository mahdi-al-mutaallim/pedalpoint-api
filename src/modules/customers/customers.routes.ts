import validateRequest from "../../middlewares/validateRequest.js";
import createRouter from "../../shared/createRouter.js";
import { CustomersControllers } from "./customers.controllers.js";
import { CustomersValidators } from "./customers.validators.js";

const router = createRouter();

router.get("/", CustomersControllers.getCustomers);
router.get(
	"/:id",
	validateRequest(CustomersValidators.customerIdParamsValidationSchema),
	CustomersControllers.getCustomerById,
);
router.post(
	"/",
	validateRequest(CustomersValidators.createCustomerValidationSchema),
	CustomersControllers.createCustomer,
);
router.put(
	"/:id",
	validateRequest(CustomersValidators.updateCustomerByIdValidationSchema),
	CustomersControllers.updateCustomerById,
);
router.delete(
	"/:id",
	validateRequest(CustomersValidators.customerIdParamsValidationSchema),
	CustomersControllers.deleteCustomerById,
);

export const CustomersRoutes = router;
