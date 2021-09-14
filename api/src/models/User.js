"use strict";
exports.__esModule = true;
exports.UserModel = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
var Document_1 = require("./Document");
exports.userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    documents: [Document_1.documentSchema]
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    }
});
exports.UserModel = (0, mongoose_1.model)('User', exports.userSchema);
