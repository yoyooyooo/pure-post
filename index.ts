import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

axios('https://daily.zhihu.com/story/9726798', {
  headers: {
    Referer: 'https://daily.zhihu.com/story/9726798',
    // Authorization: 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
  }
}).then((res) => {
  const $ = cheerio.load(res.data, { decodeEntities: false });
  $('.ZhihuDailyOIABanner').remove();
  $('.answer').prepend(`
    <div class="ZhihuDaily-AuthorLine">
      <span class="ZhihuDaily-Author">作者 / ${$('.answer .meta .author')
        .text()
        .replace(/(，$)/, '')}</span>
    </div>
  `);
  $('body').replaceWith($('.App-main'));

  // $('head').append(`
  //   <style>
  //     body {
  //       max-width: unset;
  //     }
  //     .ZhihuDailyOIABanner {
  //       display: none;
  //     }
  //   </style>
  // `);
  fs.writeFileSync('./index.html', $.html());
  console.log();
});
