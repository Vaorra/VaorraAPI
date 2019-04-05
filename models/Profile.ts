import { Schema, model } from "mongoose";

let Profile = new Schema({
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

export default model("Profile", Profile);