import { NowRequest, NowResponse } from '@now/node';
import axios from 'axios';

const urlMap = new Map([
  [/zhuanlan\.zhihu\.com\/p\/.*/, 'zhihu-answer'],
  [/zhihu\.com\/question\/\d+\/answer\/.*/, 'zhihu-answer'],
  [/mp\.weixin\.qq\.com/, 'weixin'],
  [/daily\.zhihu\.com/, 'daily']
]);

export default async (req: NowRequest, res: NowResponse) => {
  const { url, ...rest } = req.query as any;
  const matchKey = [...urlMap.keys()].find((reg) => reg.test(url));
  console.log('matchKey', matchKey, urlMap.get(matchKey));
  if (matchKey) {
    const r = await axios(
      `https://${process.env.PREFIX_URL}.now.sh/api/${urlMap.get(matchKey)}?url=${url}`,
      {}
    );
    res.end(r.data);
  } else {
    res.end('没有匹配到url');
  }
};
