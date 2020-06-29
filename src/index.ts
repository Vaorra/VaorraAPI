// custom imports
import * as logger from "./util/logger";
import database from "./config/database.json";

// Routes
import logRouter from "./routes/log";

// nodejs imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Test

app.use("/log", logRouter);



// Connect to DB and start API
mongoose
    .connect(`mongodb://VLP-MON-1.intnet.ch:27017,VLP-MON-2.intnet.ch:27017,VLP-MON-3.intnet.ch:27017/${database.dbName}`, database)
    .then(result => {
        logger.log(logger.statement.INFO, "VaorraAPI is now connected to MongoDB.", logger.source.API);
        app.listen(3000, () => logger.log(logger.statement.INFO, "VaorraAPI is now running.", logger.source.API));
    })
    .catch(err => {
        logger.log(logger.statement.ERROR, err, logger.source.API);
    });