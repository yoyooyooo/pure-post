"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const zhihu_1 = require("../utils/zhihu");
exports.default = async (req, res) => {
    const { url, markdown, markdownArray, markdownHTML, imagePrefix } = req.query;
    const _url = url.split("?")[0];
    console.log(`url  ===>  ${url}`);
    const { data } = await (0, axios_1.default)(_url, {
        headers: {
            Referer: _url,
            Authorization: "oauth c3cef7c66a1843f8b3a9e6a1e3160e20",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
            // cookie: `z_c0="${z_c0 || config.z_c0}"`
        }
    });
    const $ = cheerio_1.default.load(data, { decodeEntities: false });
    const author = $(".AuthorInfo");
    let contentNode, title, detail;
    if (url.includes("zhuanlan")) {
        contentNode = $(".Post-RichTextContainer .RichText");
        title = $(".Post-Header .Post-Title").text();
    }
    else {
        contentNode = $(".QuestionAnswer-content .RichText");
        const titleDetail = (await (0, zhihu_1.getQuestionDetail)((0, zhihu_1.getQuestionId)(url))) || {};
        detail = titleDetail.detail;
        title = $(".QuestionHeader-title").text() || titleDetail.title;
    }
    if (!contentNode)
        return "no content";
    console.log(`title  ===>  ${title}`);
    if (!+markdown && !+markdownArray && !+markdownHTML) {
        contentNode
            .prepend(`
      <h2>${title}</h2>
      ${detail ? `<div>${detail}</div>` : ""}
      <div class="divider" />
      `)
            .append('<div class="divider" style="margin-top: 50px;"/>')
            .append(author)
            .append(`<div style="text-align: right;">作者：https:${author.find("a").attr("href")}</div>`)
            .append(`<div style="text-align: right;">原答案：${url}`);
    }
    else {
        if (detail) {
            detail = cheerio_1.default.load(data, { decodeEntities: false })(`<span>${detail}</span>`).text();
        }
    }
    const result = await (0, zhihu_1.getResult)({
        query: req.query,
        $,
        contentNode,
        title,
        detail,
        wrapHTML: true
    });
    res.send(result);
};
//# sourceMappingURL=zhihu-answer.js.map