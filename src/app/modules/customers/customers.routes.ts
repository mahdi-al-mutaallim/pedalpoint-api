import createRouter from "@shared/createRouter";

const router = createRouter();

router.get("/");
router.post("/create");
router.patch("/update");
router.delete("/delete");

export const CustomersRoutes = router;
