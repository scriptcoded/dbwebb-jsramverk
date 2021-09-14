"use strict";
exports.__esModule = true;
exports.setupPassport = void 0;
var passport_1 = require("passport");
var User_1 = require("../models/User");
var localStrategy_1 = require("../strategies/localStrategy");
function setupPassport() {
    passport_1["default"].use(localStrategy_1.localStrategy);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport_1["default"].serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport_1["default"].deserializeUser(function (id, done) {
        User_1.UserModel.findById(id)
            .then(function (user) { return done(null, user); })["catch"](function (err) { return done(err); });
    });
}
exports.setupPassport = setupPassport;
