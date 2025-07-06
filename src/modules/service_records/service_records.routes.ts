import validateRequest from "../../middlewares/validateRequest.js";
import createRouter from "../../shared/createRouter.js";
import { ServiceRecordsControllers } from "./service_records.controllers.js";
import { ServiceRecordsValidators } from "./service_records.validators.js";

const router = createRouter();

router.post(
	"/",
	validateRequest(ServiceRecordsValidators.createServiceRecordValidationSchema),
	ServiceRecordsControllers.createServiceRecord,
);
router.get("/", ServiceRecordsControllers.getServiceRecords);
router.get("/status", ServiceRecordsControllers.getInCompleteServiceRecords);
router.get(
	"/:id",
	validateRequest(
		ServiceRecordsValidators.serviceRecordIdParamsValidationSchema,
	),
	ServiceRecordsControllers.getServiceRecordById,
);
router.put(
	"/:id/complete",
	validateRequest(
		ServiceRecordsValidators.updateServiceRecordByIdValidationSchema,
	),
	ServiceRecordsControllers.updateServiceRecordById,
);

export const ServiceRecordsRoutes = router;
