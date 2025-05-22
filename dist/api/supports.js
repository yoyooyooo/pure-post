"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlMap_1 = __importDefault(require("../utils/urlMap"));
exports.default = async (req, res) => {
    res.send([...urlMap_1.default.keys()].map((r) => r.toString().slice(1, -1)));
};
//# sourceMappingURL=supports.js.map