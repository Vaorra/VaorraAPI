"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const apiconfig = __importStar(require("./apiConfig.json"));
const access = __importStar(require("./access.json"));
const assert = require("assert");
const bodyParser = require("body-parser");
const app = express_1.default();
const client = new mongodb_1.MongoClient(apiconfig.mongoUrl, { useNewUrlParser: true });
let db;
client.connect((err) => {
    assert.equal(null, err);
    db = client.db("VaorraJS");
});
const authentication = (req, res, next) => {
    let user = req.headers["x-access-user"];
    let token = req.headers["x-access-token"];
    user = user ? user.toString() : undefined;
    token = token ? token.toString() : undefined;
    if (!user) {
        res.status(401).send("No user provided in the header");
    }
    else if (!token) {
        res.status(401).send("No token provided in the header");
    }
    else if (!access[user] || access[user] !== token) {
        res.status(403).send("Invalid username and/or token");
    }
    else {
        next();
    }
};
app.use(authentication);
app.use(bodyParser.json());
app.get("/api/:object/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
    mongodb(req.params["object"], (collection) => __awaiter(this, void 0, void 0, function* () {
        if (collection !== undefined) {
            collection.find().toArray().then((result) => {
                res.send(result);
            });
        }
        else {
            res.status(404).send("Data collection not found");
        }
    }));
}));
app.get("/api/:object/get/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    mongodb(req.params["object"], (collection) => __awaiter(this, void 0, void 0, function* () {
        if (collection !== undefined) {
            let result = yield collection.find({ "_id": new mongodb_1.ObjectId(req.params["id"]) }).toArray();
            if (result.length > 0) {
                res.send(result[0]);
            }
        }
        else {
            res.status(404).send("Data collection not found");
        }
    }));
}));
app.post("/api/:object/create", (req, res) => __awaiter(this, void 0, void 0, function* () {
    mongodb(req.params["object"], (collection) => __awaiter(this, void 0, void 0, function* () {
        if (collection !== undefined) {
            collection.insert(req.body, (err, result) => {
                if (err !== null) {
                    res.status(400).send("Insertion failed");
                }
                else {
                    res.status(200).send();
                }
            });
        }
        else {
            res.status(404).send("Data collection not found");
        }
    }));
}));
app.put("/api/:object/update/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    mongodb(req.params["object"], (collection) => __awaiter(this, void 0, void 0, function* () {
        if (collection !== undefined) {
            delete req.body["_id"];
            collection.updateOne({ "_id": new mongodb_1.ObjectId(req.params["id"]) }, { $set: req.body }).then((result) => {
                res.status(200).send();
            }).catch((error) => {
                console.log(error);
                res.status(400).send("Update failed");
            });
        }
        else {
            res.status(404).send("Data collection not found");
        }
    }));
}));
app.delete("/api/:object/delete/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    mongodb(req.params["object"], (collection) => __awaiter(this, void 0, void 0, function* () {
        if (collection !== undefined) {
            collection.deleteOne({ "_id": new mongodb_1.ObjectId(req.params["id"]) }, req.body);
            res.status(200).send();
        }
        else {
            res.status(404).send("Data collection not found");
        }
    }));
}));
const mongodb = (coll, operation) => {
    client.connect((err) => {
        db.collections().then((collections) => {
            operation(collections.find((collection) => collection.collectionName === coll));
        }).catch((error) => {
            console.log(error);
        });
    });
};
app.listen(5000);
