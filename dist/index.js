"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
mongoose_1.default
    .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
    .then(() => {
    console.log("Database Connected Successfully.");
})
    .catch((err) => {
    console.log("Error Connectiong to the Database", err);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', routes_1.default);
app.get('/', (request, response) => response.status(200).send({
    message: 'Welcome to POST-API',
}));
const production = process.env.NODE_ENV === 'production';
if (!production) {
    app.use((error, request, response, next) => {
        response.status(error.statusCode || 500);
        response.json({
            status: false,
            errors: {
                message: error.message,
                errorStatusCode: error.statusCode,
                errorStackTrace: error?.stack,
            },
        });
    });
}
server.listen(process.env.PORT || 3000, () => console.log(`POST-API is running on http://localhost:${process.env.PORT}`));
