import { NowRequest, NowResponse } from "@now/node";
import axios from "axios";
import qs from "querystring";

const urlMap = new Map([
  [/zhuanlan\.zhihu\.com\/p\/.*/, "zhihu-answer"],
  [/zhihu\.com\/question\/\d+\/answer\/.*/, "zhihu-answer"],
  [/mp\.weixin\.qq\.com/, "weixin"],
  [/daily\.zhihu\.com/, "daily"]
]);

export default async (req: NowRequest, res: NowResponse) => {
  const query = req.query as any;
  const matchKey = [...urlMap.keys()].find((reg) => reg.test(query.url));
  console.log("matchKey", matchKey, urlMap.get(matchKey));
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (matchKey) {
    const _url = `https://${process.env.PREFIX_URL}.vercel.app/api/${urlMap.get(
      matchKey
    )}?${qs.stringify(query)}`;
    console.log("match url", _url);
    const r = await axios(_url);
    res.send(r.data);
  } else {
    res.end("没有匹配到url");
  }
};
