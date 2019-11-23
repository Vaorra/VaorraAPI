import { Schema, model } from "mongoose";

let Log = new Schema({
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

export default model("Log", Log);