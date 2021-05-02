为保存知乎文章，保留干净的文章内容。可以利用浏览器自带打印保存成 pdf，也可以转成 markdown。
支持知乎回答、知乎日报、知乎专栏的文章。

> 个别细节可能没兼容到，总体都 OK.

## 参数说明

- url: url= 后面输入知乎地址

  [https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291](https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291)

- `markdownHTML=1`，展示成 markdown

  [https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdownHTML=1](https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdownHTML=1)

- `markdownArray=1`，markdown 接口，返回数组：

  [https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdownArray=1](https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdownArray=1)

- `latexWrap=$`，latex 包裹符号，默认为`$$`，可以改成别的：

  [https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdownHTML=1&latexWrap=\$](https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdownHTML=1&latexWrap=$)

- `markdown=1`，markdown 纯文本，用浏览器打开会展示不了换行，所以有了`markdownHTML=1`，不过接口请求还会保留换行

  [https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdown=1](https://pure-post.vercel.app/api/index?url=https://www.zhihu.com/question/20099757/answer/312670291&markdown=1)
