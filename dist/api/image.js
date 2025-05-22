"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getImageBuffer = (url, { referer }) => {
    return (0, axios_1.default)(url, {
        responseType: "arraybuffer",
        headers: referer
            ? {
                Referer: referer
            }
            : {}
    });
};
exports.default = async (req, res) => {
    const { url, referer } = req.query;
    const r = await getImageBuffer(url, { referer });
    res.end(r.data);
};
//# sourceMappingURL=image.js.map