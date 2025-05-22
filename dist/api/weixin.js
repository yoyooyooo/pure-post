"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
exports.default = async (req, res) => {
    const { url } = req.query;
    const { data } = await (0, axios_1.default)(url, {
        headers: {
            Referer: url,
            "User-Agent": "Mozilla/5.0 (Linux; U; Android 2.3.6; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255"
        }
    });
    const $ = cheerio_1.default.load(data, { decodeEntities: false });
    $("#js_pc_qr_code").map((i, a) => $(a).remove()); // 二维码
    $('#js_content > [data-tools="135编辑器"]').map((i, a) => $(a).remove());
    return $.html();
};
//# sourceMappingURL=weixin.js.map