import { NowRequest, NowResponse } from '@now/node';
import axios from 'axios';
import cheerio from 'cheerio';

export default async (req: NowRequest, res: NowResponse) => {
  const { url } = req.query as any;
  const { data } = await axios(url, {
    headers: {
      Referer: url,
      'User-Agent':
        'Mozilla/5.0 (Linux; U; Android 2.3.6; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255'
    }
  });
  const $ = cheerio.load(data, { decodeEntities: false });
  $('#js_content > [data-tools="135编辑器"]').map((i, a) => $(a).remove());
  return $.html();
};
