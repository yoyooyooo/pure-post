"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
exports.default = async (req, res) => {
    const { url } = req.query;
    try {
        const r = await (0, axios_1.default)(url, { headers: { Referer: url } });
        const $ = cheerio_1.default.load(r.data, { decodeEntities: false });
        const title = $("title").text();
        res.json({
            meta: {
                title
            }
        });
    }
    catch (e) {
        res.status(500);
        res.end(e);
    }
};
//# sourceMappingURL=pagetitle.js.map