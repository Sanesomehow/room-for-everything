"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const signUpRoute_1 = require("./routes/signUpRoute");
const logInRoute_1 = require("./routes/logInRoute");
const postsRouter_1 = require("./routes/postsRouter");
const index_js_1 = require("./generated/prisma/index.js");
const prisma = new index_js_1.PrismaClient();
exports.default = prisma;
const port = parseInt(process.env.PORT || '3000');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', index_1.router);
app.use('/signup', signUpRoute_1.router);
app.use('/login', logInRoute_1.router);
app.use('/posts', postsRouter_1.router);
app.listen(port, () => {
    console.log('listening on port' + port);
});
