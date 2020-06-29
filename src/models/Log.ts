import { Schema, model } from "mongoose";

let Log = new Schema({
    type: {
        type: String
    },
    source: {
        type: String
    },
    message: {
        type: String
    }
}, { collection: "Logs", timestamps: true });

export default model("Log", Log);