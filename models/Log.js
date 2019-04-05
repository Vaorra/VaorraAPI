"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Log = new mongoose_1.Schema({
    type: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: Date
    }
}, { collection: "Logs", timestamps: true });
exports.default = mongoose_1.model("Log", Log);
