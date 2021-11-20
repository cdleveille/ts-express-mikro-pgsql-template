import { Request, Response, Router } from "express";

import log from "../services/log";
import { Routes } from "../types/constants";

const exampleRouter = Router();

exampleRouter.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		return res.send("/example route hit!");
	} catch (error) {
		log.error(error);
	}
});

export default exampleRouter;