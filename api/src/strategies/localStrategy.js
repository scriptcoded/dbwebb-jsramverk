"use strict";
exports.__esModule = true;
exports.localStrategy = void 0;
var passport_local_1 = require("passport-local");
var typedi_1 = require("typedi");
var boom_1 = require("@hapi/boom");
var UserService_1 = require("@/services/UserService");
exports.localStrategy = new passport_local_1.Strategy(function (username, password, done) {
    var userService = typedi_1["default"].get(UserService_1.UserService);
    userService.findUserWithPassword({
        username: username,
        password: password
    })
        .then(function (user) {
        if (user) {
            done(null, user);
        }
        else {
            done((0, boom_1.unauthorized)('Invalid credentials'));
        }
    })["catch"](function (err) { return done(err); });
});
