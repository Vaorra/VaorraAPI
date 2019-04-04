import express from "express";
import { MongoClient, Db, Collection } from "mongodb";
import * as apiconfig from "./apiConfig.json";
import moment = require("moment");

const app = express();
const client = new MongoClient(apiconfig.mongoUrl, {
    useNewUrlParser: true
});

app.get("/api/:object", (req, res) => {
    console.log("BOT");
    mongodb(req.params["object"], async (collection: Collection) => {
        if (collection !== undefined) {
            let result = await collection.find().toArray();
            res.send(result);
        }
        else {
            res.sendStatus(404);
        }
    });
});

app.get("/api/:object/:id", (req, res) => {
    mongodb(req.params["object"], async (collection: Collection) => {
        if (collection !== undefined) {
            let result = await collection.find({"_id": req.params["id"]}).toArray();
            
            if (result.length > 0) {
                res.send(result[0]);
                return;
            }
        }
        res.sendStatus(404);
    });
});

const mongodb = (coll: string, operation: (collection: Collection) => Promise<void>) => {
    client.connect((err) => {
        const db = client.db("VaorraJS");
        db.collections().then((collections) => {
            operation(collections.find((collection) => collection.collectionName === coll)).then(() => {
                client.close();
            });
        }).catch((error) => {
            console.log("ERROR: " + error);
        });
    });
}

app.listen(5000);