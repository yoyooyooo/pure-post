import { NowRequest, NowResponse } from "@now/node";
import axios from "axios";

const urlMap = new Map([
  [/zhuanlan\.zhihu\.com\/p\/.*/, "zhihu-answer"],
  [/zhihu\.com\/question\/\d+\/answer\/.*/, "zhihu-answer"],
  [/mp\.weixin\.qq\.com/, "weixin"],
  [/daily\.zhihu\.com/, "daily"]
]);

export default async (req: NowRequest, res: NowResponse) => {
  const { url, pure, roam, ...rest } = req.query as any;
  const matchKey = [...urlMap.keys()].find((reg) => reg.test(url));
  console.log("matchKey", matchKey, urlMap.get(matchKey));
  console.log("pure", pure, typeof pure, !!pure);
  console.log("roam", roam, typeof roam, !!roam);
  if (matchKey) {
    const _url = `https://${process.env.PREFIX_URL}.vercel.app/api/${urlMap.get(
      matchKey
    )}?url=${url}${!!pure ? `&pure=true` : ""}${!!roam ? `&roam=true` : ""}`;
    console.log("match url", _url);
    const r = await axios(_url, {});
    res.end(r.data);
  } else {
    res.end("没有匹配到url");
  }
};
