"use strict";
exports.__esModule = true;
exports.loadConfig = exports.CONFIG_TOKEN = void 0;
var typedi_1 = require("typedi");
exports.CONFIG_TOKEN = new typedi_1.Token('CONFIG');
/**
 * Retrieves an env var. Will throw for non-existent env vars unless a fallback
 * is provided
 * @param name Name of the environment variable
 * @param fallback Fallback value for the environment variable
 * @returns The value of the environment variable
 */
function getEnvVar(name, fallback) {
    var value = process.env[name];
    if (!value) {
        if (fallback !== undefined) {
            return fallback;
        }
        throw new Error("Missing environment variable " + name);
    }
    return value;
}
function loadConfig() {
    var config = {
        port: getEnvVar('PORT'),
        appKeys: getEnvVar('APP_KEYS').split(','),
        databaseURL: getEnvVar('DATABASE_URL')
    };
    typedi_1["default"].set(exports.CONFIG_TOKEN, config);
}
exports.loadConfig = loadConfig;
