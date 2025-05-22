"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.router = (0, express_1.Router)();
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const id = req.params;
        const secret = process.env.JWT_SECRET || 'secret';
        const user = yield index_1.default.user.findUnique({
            where: {
                email: username,
            }
        });
        if (!(user === null || user === void 0 ? void 0 : user.password)) {
            res.json({
                error: "Invalid Username or Passsword"
            });
            return;
        }
        const match = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (match) {
            const token = jsonwebtoken_1.default.sign({
                userId: id
            }, secret, { expiresIn: '168h' });
            res.json({
                message: "User Login successful",
                token,
            });
        }
    }
    catch (err) {
        console.log(err + "password hash did not match");
    }
}));
