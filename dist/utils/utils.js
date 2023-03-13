"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomAvatar = exports.verifyToken = exports.checkToken = exports.createToken = exports.compare = exports.hashPassword = void 0;
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
const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'lorelei-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'shapes',
    'thumbs'
];
const getRandomAvatarStyle = (avatarStyles) => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
};
const generateRandomAvatar = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const _email = email.replace(/\s+/g, '');
    const isValidEmail = emailRegex.test(_email);
    if (!isValidEmail) {
        throw new Error('Invalid email');
    }
    const entropySource = () => Math.random().toString(36).substring(2, 7);
    const replaceAt = `-${entropySource()}-`;
    const replaceDot = `-${entropySource()}-`;
    const seed = _email.replace('@', replaceAt).split('.').join(replaceDot);
    const randomAvatarStyle = getRandomAvatarStyle(avatarStyles);
    if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
        // console.error('Invalid avatar style') // log this error to the console
        throw new Error('Something failed: ');
    }
    const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;
    return avatarUrl;
};
exports.generateRandomAvatar = generateRandomAvatar;
