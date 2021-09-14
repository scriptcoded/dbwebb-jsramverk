"use strict";
exports.__esModule = true;
exports.DocumentModel = exports.documentSchema = void 0;
var mongoose_1 = require("mongoose");
exports.documentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true }
});
exports.DocumentModel = (0, mongoose_1.model)('Document', exports.documentSchema);
