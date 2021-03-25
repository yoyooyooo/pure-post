import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import cheerio from "cheerio";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { url } = req.query as any;
  try {
    const r = await axios(url, { headers: { Referer: url } });
    const $ = cheerio.load(r.data, { decodeEntities: false });
    const title = $("title").text();
    res.json({
      meta: {
        title
      }
    });
  } catch (e) {
    res.status(500);
    res.end(e);
  }
};
