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
const index_1 = __importDefault(require("../index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.router = (0, express_1.Router)();
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
        const hash = yield bcrypt_1.default.hash(req.body.password, saltRounds);
        const newUser = yield index_1.default.user.create({
            data: {
                email: req.body.email,
                password: hash
            }
        });
        res.status(200).json({
            message: "User signed Up",
            newUser
        });
    }
    catch (error) {
        res.status(500).json({
            error: "failed to sign Up"
        });
    }
}));
