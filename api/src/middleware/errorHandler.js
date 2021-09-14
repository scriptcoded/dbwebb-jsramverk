"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.errorHandler = void 0;
var boom_1 = require("@hapi/boom");
function errorHandler() {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    return function (err, req, res, next) {
        var errToSend = (0, boom_1.internal)();
        if (err.isBoom) {
            errToSend = err;
        }
        if (err.type === 'entity.parse.failed') {
            errToSend = (0, boom_1.badRequest)(err.message);
        }
        res
            .status(errToSend.output.statusCode)
            .set(errToSend.output.headers)
            .send({
            error: __assign(__assign({}, errToSend.output.payload), { data: errToSend.data })
        });
        if (errToSend.isServer) {
            throw err;
        }
    };
}
exports.errorHandler = errorHandler;
