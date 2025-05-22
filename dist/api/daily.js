"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zhihu_1 = require("../utils/zhihu");
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
    $(".ZhihuDailyOIABanner").remove();
    $(".view-more").remove();
    $(".CornerButtons").remove();
    $(".answer").prepend(`
    <div class="ZhihuDaily-AuthorLine">
      <span class="ZhihuDaily-Author">作者 / ${$(".answer .meta .author")
        .text()
        .replace(/(，$)/, "")}</span>
    </div>
  `);
    $("body").replaceWith($(".App-main"));
    const contentNode = $(".answer .content");
    const title = $(".DailyHeader-title").text();
    const result = await (0, zhihu_1.getResult)({ query: req.query, $, contentNode, title, wrapHTML: false });
    res.send(result);
};
//# sourceMappingURL=daily.js.map