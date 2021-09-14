"use strict";
exports.__esModule = true;
exports.buildApp = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var express_pino_logger_1 = require("express-pino-logger");
var typedi_1 = require("typedi");
var body_parser_1 = require("body-parser");
var passport_1 = require("passport");
var express_session_1 = require("express-session");
var logger_1 = require("./loaders/logger");
var errorHandler_1 = require("./middleware/errorHandler");
var router_1 = require("./router");
var config_1 = require("./loaders/config");
function buildApp() {
    var config = typedi_1["default"].get(config_1.CONFIG_TOKEN);
    var logger = typedi_1["default"].get(logger_1.LOGGER_TOKEN);
    var app = (0, express_1["default"])();
    app.use(((0, errorHandler_1.errorHandler)()));
    app.use((0, body_parser_1.json)());
    app.use((0, express_pino_logger_1["default"])(logger));
    app.use((0, cors_1["default"])({
        // Bad practice, but OK for development
        origin: function (origin, callback) { return callback(null, origin); },
        credentials: true
    }));
    app.use((0, express_session_1["default"])({
        secret: config.appKeys,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport_1["default"].initialize());
    app.use(passport_1["default"].session());
    app.use((0, router_1.buildRouter)());
    return app;
}
exports.buildApp = buildApp;
