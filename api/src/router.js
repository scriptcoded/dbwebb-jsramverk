"use strict";
exports.__esModule = true;
exports.buildRouter = void 0;
var express_promise_router_1 = require("express-promise-router");
var typedi_1 = require("typedi");
var AuthController_1 = require("./controllers/AuthController");
var DocumentController_1 = require("./controllers/DocumentController");
function buildRouter() {
    var authController = typedi_1["default"].get(AuthController_1.AuthController);
    var documentController = typedi_1["default"].get(DocumentController_1.DocumentController);
    var router = (0, express_promise_router_1["default"])();
    router.post('/auth/register', authController.register);
    router.post('/auth/login', authController.login);
    router.post('/auth/logout', authController.logout);
    router.get('/auth/me', authController.me);
    router.get('/documents', documentController.getAll);
    router.get('/documents/:id', documentController.getOne);
    router.post('/documents', documentController.create);
    router.patch('/documents/:id', documentController.update);
    router["delete"]('/documents/:id', documentController["delete"]);
    return router;
}
exports.buildRouter = buildRouter;
