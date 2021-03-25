import { VercelRequest, VercelResponse } from "@vercel/node";
import cheerio from "cheerio";
import axios from "axios";

export function getQuestionId(url: string) {
  return url.match(/.*question\/(.+)\/answer.*/)[1];
}

export async function getQuestionDetial(questionId: string) {
  try {
    const res = await axios(
      `https://www.zhihu.com/api/v4/questions/${questionId}?include=data%5B*%5D.excerpt,content,detail`
    );
    return res.data;
  } catch (err) {
    return {};
  }
}

export function getFinalHTML({
  title,
  html,
  gutter
}: {
  title: string;
  html: string;
  gutter?: boolean;
}) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
      body {
        padding: 20px 0px;
        font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
        font-size: 16px;
        color: #1a1a1a;
      }
      img {
        max-width: 100%;
      }
      .LinkCard, .LinkCard:hover {
        text-decoration: none;
        border: none!important;
        color: inherit!important;
      }
      .LinkCard {
        position: relative;
        display: block;
        margin: 1em auto;
        width: 390px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 12px;
        max-width: 100%;
        overflow: hidden;
      }
      .LinkCard-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        filter: blur(20px);
        background-size: cover;
        background-position: 50%;
      }
      .LinkCard-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        border-radius: inherit;
        background-color: hsla(0,0%,96.5%,.88);
      }
      .LinkCard-text {
        overflow: hidden;
      }
      .LinkCard-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 40px;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.25;
        color: #1a1a1a;
      }
      .LinkCard-imageCell {
        margin-left: 8px;
        border-radius: 6px;
      }
      .LinkCard-image.LinkCard-image--horizontal {
        width: 90px;
      }
      .LinkCard-image {
        display: block;
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: inherit;
      }
      .LinkCard-meta {
        display: flex;
        margin-top: 4px;
        font-size: 14px;
        line-height: 20px;
        color: #999;
        white-space: nowrap;
      }

      .AuthorInfo {
        display: flex;
        justify-content: flex-end;
        align-items: center
      }
      .AuthorInfo-avatar {
        vertical-align: top
      }
      .AuthorInfo-content {
        margin-left: 14px;
        overflow: hidden
      }
      .AuthorInfo-head {
        display: flex;
        align-items: center;
        font-size: 15px;
        line-height: 1.1;
        flex-shrink: 0
      }
      .AuthorInfo-name {
        display: flex;
      }
      .AuthorInfo-name a {
        font-weight: 600;
        color: #444;
        text-decoration: none;
      }
      .AuthorInfo-badge {
        display: flex;
        align-items: center;
        margin-top: 2px;
        font-size: 14px
      }
      .AuthorInfo-badgeText {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #646464
      }
      .AuthorInfo-badgeText {
        color: #999
      }
      .AuthorInfo--plain .AuthorInfo-content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        margin-left: 10px
      }
      .AuthorInfo--plain .AuthorInfo-badge>:first-child {
        margin-top: 0
      }
      .AuthorInfo--plain .AuthorInfo-badge>:first-child:before {
        content: "\FF0C"
      }
      .AuthorInfo-detail {
        overflow: hidden
      }

      .ztext {
        word-break: break-word;
        line-height: 1.6
      }
      .ztext>:first-child {
        margin-top: 0
      }
      .ztext>:last-child {
        margin-bottom: 0
      }
      .ztext h1,.ztext h2 {
        clear: left;
        margin-top: 2.33333em;
        margin-bottom: 1.16667em;
        font-size: 1.2em;
        line-height: 1.5;
        font-weight: 600;
        font-synthesis: style
      }
      .ztext h3,.ztext h4,.ztext h5,.ztext h6 {
        clear: left;
        margin-top: 1.90909em;
        margin-bottom: 1.27273em;
        font-size: 1.1em;
        line-height: 1.5;
        font-weight: 600;
        font-synthesis: style
      }
      .ztext u {
        text-decoration: none
      }
      .ztext u,html[data-theme=dark] .ztext u {
        border-bottom: 1px dashed grey
      }
      .ztext b {
        font-weight: 600;
        font-synthesis: style
      }
      .ztext sup {
        font-size: .8em
      }
      .ztext sup[data-draft-type=reference],html[data-theme=dark] .ztext sup[data-draft-type=reference] {
        color: #175199
      }
      .ztext a:focus {
        outline: none;
        -webkit-transition: -webkit-box-shadow .3s;
        transition: -webkit-box-shadow .3s;
        transition: box-shadow .3s;
        transition: box-shadow .3s,-webkit-box-shadow .3s
      }
      .ztext a.external,.ztext a.internal,.ztext a.ztext-link {
        text-decoration: none;
        cursor: pointer;
        border-bottom: 1px solid grey
      }
      .ztext a.external:hover,.ztext a.internal:hover,.ztext a.ztext-link:hover {
        color: #175199;
        border-bottom: 1px solid #175199
      }
      .ztext a.external>.ellipsis:after,.ztext a.internal>.ellipsis:after,.ztext a.ztext-link>.ellipsis:after {
        content: "..."
      }
      .ztext a.external>.invisible,.ztext a.internal>.invisible,.ztext a.ztext-link>.invisible {
        font: 0/0 a;
        color: transparent;
        text-shadow: none;
        background-color: transparent
      }
      .ztext a.external u,.ztext a.internal u,.ztext a.ztext-link u {
        border: none
      }
      .ztext a.member_mention,html[data-theme=dark] .ztext a.member_mention {
        color: #175199
      }
      .ztext a.member_mention:hover,html[data-theme=dark] .ztext a.member_mention:hover {
        border-bottom: 1px solid #175199
      }
      .ztext p {
        margin: 1.4em 0
      }
      .ztext p.ztext-empty-paragraph {
        margin: -.8em 0
      }
      .ztext p.ztext-empty-paragraph+.ztext-empty-paragraph {
        margin: 1.4em 0
      }
      .ztext hr {
        margin: 4em auto;
        max-width: 80%;
        border: none;
        border-top: 1px solid #d3d3d3
      }
      .ztext img[eeimg] {
        max-width: 100%;
        vertical-align: middle
      }
      .ztext img[eeimg="1"] {
        margin: 0 3px;
        display: inline-block
      }
      .ztext img[eeimg="2"] {
        margin: 1.4em auto;
        display: block
      }
      .ztext blockquote {
        margin: 1.4em 0;
        padding-left: 1em;
        color: #646464;
        border-left: 3px solid #d3d3d3
      }
      .ztext ol,.ztext ul {
        margin: 1.4em 0;
        padding: 0
      }
      .ztext ol ol,.ztext ol ul,.ztext ul ol,.ztext ul ul {
        margin: 0
      }
      .ztext ol>ol,.ztext ol>ul,.ztext ul>ol,.ztext ul>ul {
        display: table-row
      }
      .ztext ol>ol:before,.ztext ol>ul:before,.ztext ul>ol:before,.ztext ul>ul:before {
        display: table-cell;
        content: ""
      }
      .ztext ul {
        display: table
      }
      .ztext ul>li {
        list-style: inside;
      }
      .ztext ol {
        display: table;
        counter-reset: ol
      }
      .ztext ol>li {
        display: table-row;
        list-style: none
      }
      .ztext ol>li:before {
        display: table-cell;
        text-align: right;
        counter-increment: ol;
        content: counter(ol) ". ";
        white-space: pre
      }
      .ztext ol ol {
        counter-reset: ol2
      }
      .ztext ol ol li:before {
        counter-increment: ol2;
        content: counter(ol2) ". "
      }
      .ztext ol ol ol {
        counter-reset: ol3
      }
      .ztext ol ol ol li:before {
        counter-increment: ol3;
        content: counter(ol3) ". "
      }
      .ztext ol ol ol ol {
        counter-reset: ol4
      }
      .ztext ol ol ol ol li:before {
        counter-increment: ol4;
        content: counter(ol4) ". "
      }
      .ztext figure {
        margin: 1.4em 0
      }
      .ztext figure .content_image,.ztext figure .origin_image {
        margin: 0 auto
      }
      .ztext figure figcaption {
        margin-top: .66667em;
        padding: 0 1em;
        font-size: .9em;
        line-height: 1.5;
        text-align: center;
        color: #999
      }
        margin-top: 2.24em
      }
      .ztext figure:not([data-size])>[data-size=small],.ztext figure[data-size=small] {
        clear: both
      }
        float: left;
        margin: 0 20px 20px 0;
        max-width: 33%
      }
        float: right;
        margin: 0 0 20px 20px;
        max-width: 33%
      }
      .ztext .content_image,.ztext .origin_image {
        display: block;
        max-width: 100%;
        margin: 1.4em auto
      }
      .ztext .content_image.zh-lightbox-thumb,.ztext .origin_image.zh-lightbox-thumb {
        cursor: -webkit-zoom-in;
        cursor: zoom-in
      }
      .ztext code {
        margin: 0 2px;
        padding: 3px 4px;
        border-radius: 3px;
        font-family: Menlo,Monaco,Consolas,Andale Mono,lucida console,Courier New,monospace;
        font-size: .9em;
        background-color: #f6f6f6
      }
      .ztext pre {
        margin: 1.4em 0;
        padding: .88889em;
        font-size: .9em;
        word-break: normal;
        word-wrap: normal;
        white-space: pre;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background: #f6f6f6;
        border-radius: 4px
      }
      .ztext pre code {
        margin: 0;
        padding: 0;
        font-size: inherit;
        border-radius: 0;
        background-color: inherit
      }
      .ztext li pre {
        white-space: pre-wrap
      }
      .ztext-referene-tooltip .TooltipContent-children {
        display: block;
        max-width: 250px;
        max-height: 150px;
        overflow: auto;
        word-wrap: break-word;
        white-space: normal;
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content
      }
      .ztext .link-box,.ztext .video-box {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin: 1.4em 0;
        overflow: auto;
        white-space: normal;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 3px rgba(26,26,26,.1);
        box-shadow: 0 1px 3px rgba(26,26,26,.1)
      }
      .ztext .link-box .thumbnail,.ztext .video-box .thumbnail {
        -ms-flex-negative: 0;
        flex-shrink: 0;
        width: 90px;
        height: 90px;
        object-fit: cover
      }
      .ztext .link-box .content,.ztext .video-box .content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 10px 1em;
        overflow: hidden;
        flex-direction: column;
        -ms-flex-pack: distribute;
        justify-content: space-around
      }
      .ztext .link-box .title,.ztext .video-box .title {
        font-size: 1.2em;
        font-weight: 600;
        font-synthesis: style
      }
      .ztext .link-box .url,.ztext .video-box .url {
        overflow: hidden;
        color: grey;
        text-overflow: ellipsis;
        word-wrap: normal;
        white-space: nowrap
      }
      .ztext .link-box .label,.ztext .video-box .label {
        display: none
      }

      .divider {
        height: 1px;
        background: rgba(0, 0, 0, 0.52);
        margin: 40px 0px;
      }
      </style>
    </head>
    <body>
      <div class="ztext">
        ${html}
      <div>
    </body>
  </html>
  `;
}

export async function getResponse({
  $,
  contentNode,
  res,
  req,
  wrapHTML,
  title,
  detail
}: {
  $: any;
  contentNode: any;
  req: VercelRequest;
  res: VercelResponse;
  wrapHTML: boolean;
  title?: string;
  detail?: string;
}) {
  console.log("getResponse", req.query);
  const {
    url,
    markdown,
    imagePrefix: isImagePrefix,
    markdownArray,
    markdownHTML
  } = (req.query as unknown) as ZHIHU.query;
  const isMarkdown = !!+markdown || !!+markdownArray || !!+markdownHTML;

  const imagePrefix = isImagePrefix
    ? `https://${process.env.PREFIX_URL}.vercel.app/api/image?url=`
    : "";

  const handleImages = (imgs) => {
    imgs.map((i, img) => {
      const src = $(img).attr("src");
      const original = $(img).attr("data-original");
      const actualsrc = $(img).attr("data-actualsrc");
      let _src = original || actualsrc || src;

      const srcset = $(img).attr("srcset");
      srcset &&
        $(img).attr("srcset", srcset.replace(/(https.*?\.(jpg|png|jpeg))/g, `${imagePrefix}$1`));

      if (_src) {
        // console.log("img src:  ", _src);
        if (_src.startsWith("https://www.zhihu.com/equation?tex=")) {
          if (isMarkdown) {
            const alt = $(img).attr("alt");
            if (alt === "[公式]") {
              $(img).replaceWith(`<span> $$${$(img).attr("data-formula")}$$ </span>`);
            } else {
              $(img).replaceWith(`<span> $$${alt}$$ </span>`);
            }
          }
        } else {
          if (_src.endsWith("gif")) {
            $(img).attr("src", `https://images.weserv.nl/?url=${_src}`);
          } else {
            $(img).attr("src", imagePrefix + _src + (imagePrefix ? `&referer=${url}` : ""));
          }
        }
      }
    });
  };

  const imgs = $(contentNode).find("img");
  handleImages(imgs);

  if (isMarkdown) {
    const getMarkdown = (children) => {
      return children
        .toArray()
        .flatMap((el) => {
          if (el.type === "text") {
            return el.data;
          } else if (el.type === "tag") {
            // 加粗
            $(el)
              .find("b")
              .map((i, b) => $(b).replaceWith(`**${$(b).text()}**`));

            const mHeading = el.name.match(/h(1|2|3)/);
            if (mHeading) {
              const heading = mHeading[1];
              return "#".repeat(+heading) + " " + $(el).text().trim();
            }
            if (el.name === "blockquote") {
              return "> " + getMarkdown($(el).contents()).join("\n");
            }
            if (el.name === "figure") {
              const $img = $(el).find("img");
              const alt = $(el).find("figcaption").text();
              const src = $img.attr("src");
              const original = $img.attr("data-original");
              const actualsrc = $img.attr("data-actualsrc");
              let _src = original || actualsrc || src;
              return `![${alt.replace(/\[|\]/g, "")}](${_src})`;
            }
            if (el.name === "hr") {
              return "---";
            }
            if (el.name === "a") {
              if (el.attribs.class === "video-box") {
                return `[${$(el).find(".title")?.text().replace(/\[|\]/g, "") || " "}](${
                  el.attribs.href
                })`;
              } else if (el.attribs.class?.includes("LinkCard")) {
                return `[${$(el).find(".LinkCard-title").text()}](${el.attribs.href})`;
              }
            }
            if (el.name === "p") {
              $(el)
                .find("a")
                .map((i, a) => {
                  if (a.attribs.class === "video-box") {
                    const url = decodeURIComponent(a.attribs.href).match(
                      /https?\:\/\/link\.zhihu\.com\/\?target=(.*)/
                    )?.[1];
                    url &&
                      $(a).replaceWith(
                        `[${$(a).find(".title")?.text().replace(/\[|\]/g, "") || " "}](${url})`
                      );
                  } else {
                    // 外链
                    $(a).replaceWith(`[${$(a).text().replace(/\[|\]/g, "")}](${a.attribs.href})`);
                  }
                });
            }
            if (el.name === "ol" || el.name === "ul") {
              return getMarkdown($(el).contents()).map((a, i) => `${i + 1}. ${a}`);
            }

            if (el.name === "div" && el.attribs.class === "highlight") {
              const $codes = $(el).find("code");
              if ($codes.length > 0) {
                const $code = $codes.eq(0);
                const language = $code.attr("class").match(/language-(.*)/)?.[1] || "";
                return `\`\`\`${language}
${$code.text().replace(/(\n)$/, "")}\`\`\``;
              }
            }

            return $(el).text().trim();
          }
        })
        .filter((a) => !!a && a !== "\n");
    };
    contentNode.find("a").map((i, a) => {
      const url = decodeURIComponent(a.attribs.href).match(
        /https?\:\/\/link\.zhihu\.com\/\?target=(.*)/
      )?.[1];
      $(a).attr("href", url);
    });
    const list = getMarkdown(contentNode.contents());
    const head = [title, detail].filter(Boolean);
    head.length && list.unshift(...head, "---");
    if (markdownHTML) {
      res.send(list.map((a) => `<p>${a}</p>`).join("\n"));
      return;
    } else {
      res.send(!!+markdownArray ? list : list.join("\n"));
      return;
    }
  }

  if (wrapHTML) {
    res.send(getFinalHTML({ title, html: contentNode.html() }));
  } else {
    res.send($.html());
  }
}
