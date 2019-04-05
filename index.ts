// custom imports
import * as logger from "./util/logger";
import database from "./config/database.json";

// nodejs imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// model imports
import Profile from "./models/Profile";

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Test 

// Error Handling
app.use((error, req, res, next) =>{
    logger.log(logger.consoleStatement.ERROR, error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
});

mongoose
    .connect("mongodb://vaorra.net:27017/VaorraJS", database)
    .then(result => {
        logger.log(logger.consoleStatement.INFO, "VaorraAPI is now connected to MongoDB.")
        app.listen(3000, () => logger.log(logger.consoleStatement.INFO, "VaorraAPI is now running."));
    })
    .catch(err => {
        logger.log(logger.consoleStatement.ERROR, err);
    });
