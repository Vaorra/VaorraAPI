"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// custom imports
const logger = __importStar(require("./util/logger"));
const database_json_1 = __importDefault(require("./config/database.json"));
// nodejs imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const router = express_1.default.Router();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default
    .connect("mongodb://vaorra.net:27017/VaorraJS", database_json_1.default)
    .then(result => {
    logger.log(logger.consoleStatement.INFO, "VaorraAPI is now connected to MongoDB.");
    app.listen(3000, () => logger.log(logger.consoleStatement.INFO, "VaorraAPI is now running."));
})
    .catch(err => {
    logger.log(logger.consoleStatement.ERROR, err);
});
