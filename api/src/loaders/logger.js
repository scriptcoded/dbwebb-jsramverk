"use strict";
exports.__esModule = true;
exports.setupLogger = exports.LOGGER_TOKEN = void 0;
var pino_1 = require("pino");
var typedi_1 = require("typedi");
exports.LOGGER_TOKEN = new typedi_1.Token('LOGGER');
function setupLogger() {
    var logger = (0, pino_1["default"])();
    typedi_1["default"].set(exports.LOGGER_TOKEN, logger);
}
exports.setupLogger = setupLogger;
