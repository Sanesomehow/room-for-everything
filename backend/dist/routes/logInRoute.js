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
const prismaConfig_1 = __importDefault(require("../prismaConfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.router = (0, express_1.Router)();
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const secret = process.env.JWT_SECRET || 'secret';
        const user = yield prismaConfig_1.default.user.findUnique({
            where: {
                email: username,
            }
        });
        if (!user) {
            res.status(401).json({
                error: "Invalid Username or Passsword"
            });
            return;
        }
        if (!user.password) {
            res.status(401).json({
                error: "This account was created using Google. Please use Google Sign-In."
            });
            return;
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (match) {
            const token = jsonwebtoken_1.default.sign({
                userId: user.id
            }, secret, { expiresIn: '168h' });
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }).json({
                message: "User Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        }
    }
    catch (err) {
        console.log(err + "password hash did not match");
    }
}));
