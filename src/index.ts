// custom imports
import * as logger from "./util/logger";
import database from "./config/database.json";

// nodejs imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test



// Error Handling

mongoose
    .connect(`mongodb://VLP-MON-1.intnet.ch:27017,VLP-MON-2.intnet.ch:27017,VLP-MON-3.intnet.ch:27017/${database.dbName}`, database)
    .then(result => {
        logger.log(logger.statement.INFO, "VaorraAPI is now connected to MongoDB.");
        app.listen(3000, () => logger.log(logger.statement.INFO, "VaorraAPI is now running."));
    })
    .catch(err => {
        logger.log(logger.statement.ERROR, err);
    });