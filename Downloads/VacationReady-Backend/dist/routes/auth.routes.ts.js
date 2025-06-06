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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    users.push({ email, passwordHash });
    const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}));
router.get('/authtest', (req, res) => {
    res.json({ message: 'Auth test successful' });
});
exports.default = router;
