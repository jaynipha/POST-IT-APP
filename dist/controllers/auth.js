"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const utils_1 = require("../utils/utils");
const userService = __importStar(require("../services/user.service"));
const config_1 = __importDefault(require("../config"));
const secret = config_1.default.sessionSecet;
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkExistingUser = await userService.findUser({ email });
        if (!checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            });
        }
        const checkPasswordValidity = (0, utils_1.compare)(password, checkExistingUser.password);
        if (!checkPasswordValidity) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            });
        }
        const token = (0, utils_1.createToken)({ role: checkExistingUser.role, email, id: checkExistingUser.id }, "1d", secret);
        return res.status(200).send({ status: true, token });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.signIn = signIn;
