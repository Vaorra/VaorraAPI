// custom imports
import {colorCodes} from "./color";

// nodejs imports
import moment from "moment";

// model imports
import Log from "../models/Log";

const statement = {
    CMD: {name: "CMD", color: colorCodes.FgCyan},
    INFO: {name: "INFO", color: colorCodes.FgBlue},
    WARN: {name: "WARN", color: colorCodes.FgYellow},
    ERROR: {name: "ERROR", color: colorCodes.FgRed}
};

const log = (statement:{name:String, color:String}, message:String) => {
    console.log(`[${statement.color}${statement.name}${colorCodes.Reset}]\t${moment().format("YYYY-MM-DD HH:mm:ss")} ${colorCodes.FgGreen}»${colorCodes.Reset} ${message}`);
    let log = new Log({
        type: statement.name,
        message: message,
        date: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    log.save();
};

export { log, statement };