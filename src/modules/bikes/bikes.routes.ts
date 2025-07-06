import validateRequest from "../../middlewares/validateRequest.js";
import createRouter from "../../shared/createRouter.js";
import { BikesControllers } from "./bikes.controllers.js";
import { BikesValidators } from "./bikes.validators.js";

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
