import validateRequest from "@app/middlewares/validateRequest";
import createRouter from "@shared/createRouter";
import { ServiceRecordsControllers } from "./service_records.controllers";
import { ServiceRecordsValidators } from "./service_records.validators";

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
