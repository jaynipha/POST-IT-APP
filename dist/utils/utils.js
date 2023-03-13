"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.checkToken = exports.createToken = exports.compare = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function hashPassword(password) {
    return await bcrypt_1.default.hashSync(password, 10);
}
exports.hashPassword = hashPassword;
async function compare(password, hash) {
    return await bcrypt_1.default.compareSync(password, hash);
}
exports.compare = compare;
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
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (err) {
        throw new Error('Invalid Token');
    }
};
exports.verifyToken = verifyToken;
