"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.checkToken = exports.comparePassword = exports.createToken = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
};
exports.hashPassword = hashPassword;
const createToken = (payload, expiresIn = '1d') => {
    return jsonwebtoken_1.default.sign(payload, process.env.SESSION_SECRET, { expiresIn });
};
exports.createToken = createToken;
const comparePassword = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.comparePassword = comparePassword;
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
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SESSION_SECRET);
        return decoded;
    }
    catch (err) {
        throw new Error('Invalid Token');
    }
};
exports.verifyToken = verifyToken;
