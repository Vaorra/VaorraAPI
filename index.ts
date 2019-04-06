import express from "express";
import { MongoClient, Db, Collection, ObjectId, WriteOpResult } from "mongodb";
//@ts-ignore
import * as apiconfig from "./apiConfig.json";
//@ts-ignore
import * as access from "./access.json";
import moment = require("moment");
import assert = require("assert");
import { NextFunction } from "express-serve-static-core";
import bodyParser = require("body-parser");

const app = express();
const client = new MongoClient(apiconfig.mongoUrl, { useNewUrlParser: true });

let db: Db;

client.connect((err) => {
    assert.equal(null, err);
    db = client.db("VaorraJS");
});

const authentication = (req: express.Request, res: express.Response, next: NextFunction) => {
    let user = req.headers["x-access-user"];
    let token = req.headers["x-access-token"];

    if (!user) {
        res.status(401).send("No user provided in the header");
    }

    else if (!token) {
        res.status(401).send("No token provided in the header");
    }

    else if (!access[user.toString()] || access[user.toString()] !== token) {
        res.status(403).send("Invalid username and/or token");
    }

    else {
        next();
    }
};

app.use(authentication);
app.use(bodyParser.json());

app.get("/api/:object/all", async (req, res) => {
    mongodb(req.params["object"], async (collection: Collection) => {
        if (collection !== undefined) {
            collection.find().toArray().then((result) => {
                res.send(result);
            });
        }
        else {
            res.status(404).send("Data collection not found");
        }
    });
});

app.get("/api/:object/get/:id", async (req, res) => {
    mongodb(req.params["object"], async (collection: Collection) => {
        if (collection !== undefined) {
            let result = await collection.findOne({"_id": new ObjectId(req.params["id"])});
            
            if (result !== null) {
                res.send(result);
            }
            else {
                res.status(404).send("Document could not be found")
            }
        }
        else {
            res.status(404).send("Data collection not found");
        }
    });
});

app.post("/api/:object/create", async (req, res) => {
    mongodb(req.params["object"], async (collection: Collection) => {
        if (collection !== undefined) {
            collection.insertOne(req.body, (err, result) => {
                if (err !== null) {
                    res.status(400).send("Document could not be inserted");
                }
                else{
                    res.status(200).send(result.insertedId.toHexString());
                }
            });
        }
        else {
            res.status(404).send("Data collection not found");
        }
    });
});

app.put("/api/:object/update/:id", async (req, res) => {
    mongodb(req.params["object"], async (collection: Collection) => {
        if (collection !== undefined) {
            delete req.body["_id"];
            collection.updateOne({"_id": new ObjectId(req.params["id"])}, { $set: req.body}).then((result) => {
                res.status(200).send();
            }).catch((error) => {
                console.log(error);
                res.status(400).send("Document could not be updated");
            });
        }
        else {
            res.status(404).send("Data collection not found");
        }
    });
});

app.delete("/api/:object/delete/:id", async (req, res) => {
    mongodb(req.params["object"], async (collection: Collection) => {
        if (collection !== undefined) {
            collection.deleteOne({"_id": new ObjectId(req.params["id"])}, req.body);
            
            res.status(200).send();
        }
        else {
            res.status(404).send("Data collection not found");
        }
    });
});

const mongodb = (coll: string, operation: (collection: Collection) => Promise<void>) => {
    client.connect((err) => {
        db.collections().then((collections) => {
            operation(collections.find((collection) => collection.collectionName === coll));
        }).catch((error) => {
            console.log(error);
        });
    });
};

app.listen(5000);