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
const app = express_1.default();
const client = new mongodb_1.MongoClient(apiconfig.mongoUrl, {
    useNewUrlParser: true
});
app.get("/api/:object", (req, res) => {
    console.log("BOT");
    mongodb(req.params["object"], (collection) => __awaiter(this, void 0, void 0, function* () {
        if (collection !== undefined) {
            let result = yield collection.find().toArray();
            res.send(result);
        }
        else {
            res.sendStatus(404);
        }
    }));
});
app.get("/api/:object/:id", (req, res) => {
    mongodb(req.params["object"], (collection) => __awaiter(this, void 0, void 0, function* () {
        if (collection !== undefined) {
            let result = yield collection.find({ "_id": req.params["id"] }).toArray();
            if (result.length > 0) {
                res.send(result[0]);
                return;
            }
        }
        res.sendStatus(404);
    }));
});
const mongodb = (coll, operation) => {
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
};
app.listen(5000);
