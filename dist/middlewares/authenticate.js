"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfIsAdmin = exports.authenticate = void 0;
const toolbox_1 = require("../utils/toolbox");
const authenticate = (req, res, next) => {
    try {
        const token = (0, toolbox_1.checkToken)(req);
        if (!token)
            return res.status(401).send({ status: false, message: 'Access denied, Token required' });
        const decodedToken = (0, toolbox_1.verifyToken)(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(404).send({ status: false, message: error.message });
    }
};
exports.authenticate = authenticate;
const checkIfIsAdmin = (req, res, next) => {
    if (req.user?.id !== 'admin') {
        return res.status(401).send({ status: false, message: 'Access denied, Admin Access Only !!!' });
    }
    next();
};
exports.checkIfIsAdmin = checkIfIsAdmin;
