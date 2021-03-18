import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const getImageBuffer = (url: string, { referer }) => {
  return axios(url, {
    responseType: "arraybuffer",
    headers: referer
      ? {
          Referer: referer
        }
      : {}
  });
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const { url, referer } = req.query as any;
  const r = await getImageBuffer(url, { referer });
  res.end(r.data);
};
