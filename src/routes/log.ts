import { Router } from "express";
import * as logController from "../controllers/log";
import { body } from "express-validator/check";
import { Logger } from "mongodb";

const logRouter = Router();

logRouter.get("/", logController.getLogs);
logRouter.get("/:id", logController.getLobByUD);
logRouter.post("/", [
    body("type").custom(value => {
        if(!(value === "INFO" || value === "CMD" || value === "WARN" || value === "ERROR")){
            return Promise.reject();
        }
    })
] ,logController.createLog);

export default logRouter;