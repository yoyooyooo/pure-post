"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const urlMap_1 = __importDefault(require("../utils/urlMap"));
exports.default = async (req, res) => {
    const query = req.query;
    const matchKey = [...urlMap_1.default.keys()].find((reg) => reg.test(decodeURIComponent(query.url)));
    console.log("matchKey", matchKey, urlMap_1.default.get(matchKey));
    if (matchKey) {
        const _url = `https://${process.env.PREFIX_URL}.vercel.app/api/${urlMap_1.default.get(matchKey)}?${decodeURIComponent(querystring_1.default.stringify(query))}`;
        console.log("match url", _url);
        const r = await (0, axios_1.default)(_url);
        res.send(r.data);
    }
    else {
        res.status(500);
        res.end("can't match url");
    }
};
//# sourceMappingURL=index.js.map