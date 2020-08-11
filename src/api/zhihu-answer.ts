import { getFinalHTML, getQuestionDetial, getQuestionId } from '../utils/';
import { NowRequest, NowResponse } from '@now/node';
import axios from 'axios';
import cheerio from 'cheerio';

const refererUrl = `https://${process.env.PREFIX_URL}.vercel.app/api/image?url=`;

async function getHTML(url: string, { z_c0 }) {
  url = url.split('?')[0];
  console.log(`url  ===>  ${url}`);
  const res = await axios(url, {
    headers: {
      Referer: url,
      Authorization: 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      // cookie: `z_c0="${z_c0 || config.z_c0}"`
    }
  });
  const $ = cheerio.load(res.data, { decodeEntities: false });

  const author = $('.AuthorInfo');

  let contentNode: any, title: string, detail: any;
  if (url.includes('zhuanlan')) {
    contentNode = $('.Post-RichTextContainer .RichText');
    title = $('.Post-Header .Post-Title').text();
  } else {
    contentNode = $('.QuestionAnswer-content .RichText');
    const titleDetail = (await getQuestionDetial(getQuestionId(url))) || {};
    detail = titleDetail.detail;
    title = $('.QuestionHeader-title').text() || titleDetail.title;
  }

  if (!contentNode) return 'no content';
  console.log(`title  ===>  ${title}`);

  contentNode
    .prepend(
      `
      <h2>${title}</h2>
      ${detail ? `<div>${detail}</div>` : ''}
      <div class="divider" />
    `
    )
    .append('<div class="divider" style="margin-top: 50px;"/>')
    .append(author)
    .append(`<div style="text-align: right;">作者：https:${author.find('a').attr('href')}</div>`)
    .append(`<div style="text-align: right;">原答案：${url}`);

  const imgs = $(contentNode).find('img');

  imgs.map((i, img) => {
    const src = $(img).attr('src');
    const original = $(img).attr('data-original');
    const actualsrc = $(img).attr('data-actualsrc');
    let _src = original || actualsrc || src;

    const srcset = $(img).attr('srcset');
    srcset &&
      $(img).attr('srcset', srcset.replace(/(https.*?\.(jpg|png|jpeg))/g, `${refererUrl}$1`));

    if (_src && !_src.startsWith('https://www.zhihu.com/equation?tex=')) {
      const imagePrefix = _src.endsWith('gif') ? 'https://images.weserv.nl/?url=' : refererUrl;
      $(img).attr('src', imagePrefix + _src + `&referer=${url}`);
    }
  });

  const html = getFinalHTML({ title, html: contentNode.html() });
  return html;
}

export default async (req: NowRequest, res: NowResponse) => {
  const { url, z_c0 } = req.query as any;
  try {
    res.send(await getHTML(url, { z_c0 }));
  } catch (err) {
    res.send(`something wrong ${JSON.stringify(err?.message)} ${JSON.stringify(err)}`);
  }
};
