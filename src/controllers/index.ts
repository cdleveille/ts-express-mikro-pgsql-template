import { Request, Response, Router } from "express";

import exampleRouter from "./example";
import log from "../services/log";
import { Routes } from "../types/constants";

const router = Router();
router.use(Routes.example, exampleRouter);

router.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		res.render("index");
	} catch (error) {
		log.error(error);
	}
});

export default router;