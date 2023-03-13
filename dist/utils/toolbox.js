"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.checkToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, expiresIn, secret) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.createToken = createToken;
const checkToken = (req) => {
    const { headers: { authorization }, } = req;
    let bearerToken = null;
    if (authorization === undefined)
        throw new Error('no auth');
    if (authorization) {
        bearerToken = authorization.split(' ')[1]
            ? authorization.split(' ')[1]
            : authorization;
    }
    return (bearerToken
        || req.headers['x-access-token']
        || req.headers.token
        || req.body.token);
};
exports.checkToken = checkToken;
const verifyToken = (token, secret) => {
    // const secret:string |undefined = process.env.SESSION_SECRET
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (err) {
        throw new Error('Invalid Token');
    }
};
exports.verifyToken = verifyToken;
