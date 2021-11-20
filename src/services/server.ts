import compression from "compression";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";

import router from "../controllers/index";
import Config from "../helpers/config";
import { Database } from "../services/db";
import log from "../services/log";

export default class App {
	private static instance: Express;

	private static async setup() {
		App.instance = express();

		const logStream = fs.createWriteStream("combined.log", { flags: "a" });
		App.instance.use(morgan("combined", { stream: logStream }));

		App.instance.use((req: Request, res: Response, next: NextFunction) => {
			res.locals.em = Database.Manager.fork();
			next();
		});

		App.instance.use(helmet());
		App.instance.use(compression());
		App.instance.use(cors());
		App.instance.use("/", router);
		App.instance.use(express.static(Config.IS_PROD ? "./public.min" : "./public"));
		App.instance.set("view engine", "ejs");
		App.instance.set("views", Config.IS_PROD ? "./public.min/views" : "./public/views");
		App.instance.set("json spaces", 2);
		App.instance.disabled("x-powered-by");
	}

	public static async start() {
		await Database.Connect();
		await App.setup();

		App.instance.listen(Config.PORT);
		log.info(`Server started - listening on http://${Config.HOST}:${Config.PORT}`);
	}
}