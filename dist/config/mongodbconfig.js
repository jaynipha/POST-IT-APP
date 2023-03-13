'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
//const MONGODB_URL = mongodb+srv://<ifenkili>:<Donscorp1711*>@cluster0.uzo1swk.mongodb.net/post-it?retryWrites=true&w=majority
dotenv_1.default.config();
const initDatabase = (mongoose) => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Connected to mongoDb...'))
        .catch((err) => console.log(err.message));
};
exports.default = initDatabase;
