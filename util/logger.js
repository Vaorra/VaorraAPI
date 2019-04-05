"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// custom imports
const color_1 = require("./color");
// nodejs imports
const moment_1 = __importDefault(require("moment"));
// model imports
const Log_1 = __importDefault(require("../models/Log"));
const consoleStatement = {
    CMD: { name: "CMD", color: color_1.colorCodes.FgCyan },
    INFO: { name: "INFO", color: color_1.colorCodes.FgBlue },
    WARN: { name: "WARN", color: color_1.colorCodes.FgYellow },
    ERROR: { name: "ERROR", color: color_1.colorCodes.FgRed }
};
exports.consoleStatement = consoleStatement;
const log = (statement, message) => {
    console.log(`[${statement.color}${statement.name}${color_1.colorCodes.Reset}]\t${moment_1.default().format("YYYY-MM-DD HH:mm:ss")} ${color_1.colorCodes.FgGreen}»${color_1.colorCodes.Reset} ${message}`);
    let log = new Log_1.default({
        type: statement.name,
        message: message,
        date: moment_1.default().format("YYYY-MM-DD HH:mm:ss")
    });
    log.save();
};
exports.log = log;
