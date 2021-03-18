import { VercelRequest, VercelResponse } from "@vercel/node";
import urlMap from "../utils/urlMap";

export default async (req: VercelRequest, res: VercelResponse) => {
  res.send([...urlMap.keys()].map((r) => r.toString().slice(1, -1)));
};
