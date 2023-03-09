"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const toolbox_1 = require("../utils/toolbox");
const config_1 = __importDefault(require("../config"));
const secret = config_1.default.sessionSecet;
async function authenticate(req, res, next) {
    try {
        const token = (0, toolbox_1.checkToken)(req);
        if (!token)
            return res.status(401).send({ status: false, message: 'Access denied, Token required' });
        const decodedToken = (0, toolbox_1.verifyToken)(token, secret);
        res.locals.user = decodedToken;
        return next();
    }
    catch (error) {
        return res.status(404).send({ status: false, message: error.message });
    }
}
exports.authenticate = authenticate;
