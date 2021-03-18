import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";
import qs from "querystring";
import urlMap from "../utils/urlMap";

export default async (req: NowRequest, res: NowResponse) => {
  const query = req.query as any;
  const matchKey = [...urlMap.keys()].find((reg) => reg.test(query.url));
  console.log("matchKey", matchKey, urlMap.get(matchKey));

  if (matchKey) {
    const _url = `https://${process.env.PREFIX_URL}.vercel.app/api/${urlMap.get(
      matchKey
    )}?${qs.stringify(query)}`;
    console.log("match url", _url);
    const r = await axios(_url);
    res.send(r.data);
  } else {
    res.status(500);
    res.end("can't match url");
  }
};
