import validateRequest from "@app/middlewares/validateRequest";
import createRouter from "@shared/createRouter";
import { BikesControllers } from "./bikes.controllers";
import { BikesValidators } from "./bikes.validators";

const router = createRouter();

router.post(
	"/",
	validateRequest(BikesValidators.createBikeValidationSchema),
	BikesControllers.createBike,
);
router.get("/", BikesControllers.getBikes);
router.get(
	"/:id",
	validateRequest(BikesValidators.bikeIdParamsValidationSchema),
	BikesControllers.getBikeById,
);

export const BikesRoutes = router;
