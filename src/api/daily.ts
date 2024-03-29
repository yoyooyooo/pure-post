import { getResult } from "../utils/zhihu";
import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import cheerio from "cheerio";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { url } = req.query as any;
  const { data } = await axios(url, {
    headers: {
      Referer: url,
      "User-Agent":
        "Mozilla/5.0 (Linux; U; Android 2.3.6; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255"
    }
  });

  const $ = cheerio.load(data, { decodeEntities: false });

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

  const result = await getResult({ query: req.query, $, contentNode, title, wrapHTML: false });
  res.send(result);
};
