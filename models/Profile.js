"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Profile = new mongoose_1.Schema({
    xp: {
        type: Number
    },
    realname: {
        type: String
    },
    country: {
        type: String
    },
    birthday: {
        type: Date
    },
    favoriteGame: {
        type: String
    },
    twitchName: {
        type: String
    },
    epicgamesName: {
        type: String
    },
    steamName: {
        type: String
    },
}, { collection: "Profiles", timestamps: true });
exports.default = mongoose_1.model("Profile", Profile);
