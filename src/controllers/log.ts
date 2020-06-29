import express from "express";
import { NextFunction } from "express-serve-static-core";
import * as logger from "../util/logger";
import Log from "../models/Log";
import { validationResult } from "express-validator/check";

export async function getLogs(req:express.Request, res:express.Response, next:NextFunction) {

    try{
        res.status(200).json(await Log.find());
    } catch (err){
        res.status(500).json("Internal Server Error!");
        logger.log(logger.statement.ERROR, err, logger.source.API);
    }

};

export async function getLobByUD(req:express.Request, res:express.Response, next:NextFunction) {

    try{
        res.status(200).json(await Log.findById(req.params.id));
    } catch (err){
        res.status(404).json("Not Found!");
        logger.log(logger.statement.ERROR, err, logger.source.API);
    }

};

export async function createLog(req:express.Request, res:express.Response, next:NextFunction) {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json("Unprocessable Entity!");
    }

    try{

        let log = new Log({
            type: req.body.type,
            source: req.body.source,
            message: req.body.message
        });
        await log.save();

        res.status(201).json("Created!");
    } catch (err){
        res.status(500).json("Internal Server Error!");
        logger.log(logger.statement.ERROR, err, logger.source.API);
    }

}
