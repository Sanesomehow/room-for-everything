"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = require("./routes/index");
const signUpRoute_1 = require("./routes/signUpRoute");
const logInRoute_1 = require("./routes/logInRoute");
const postsRoute_1 = require("./routes/postsRoute");
const googleAuthRoute_1 = require("./routes/googleAuthRoute");
const port = parseInt(process.env.PORT || '3000');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Add your frontend URL
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use('/', index_1.router);
// Auth routes are still registered but won't be used during development
app.use('/login', logInRoute_1.router);
app.use('/signup', signUpRoute_1.router);
app.use('/auth', googleAuthRoute_1.router);
// The posts route is the main one we need working without auth
app.use('/api/posts', postsRoute_1.router);
//TODO: add a route for sharing
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
