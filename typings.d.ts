declare namespace ZHIHU {
  interface query {
    url: string;
    markdown?: "0" | "1";
    markdownArray?: "0" | "1";
    markdownHTML?: "0" | "1";
    imagePrefix?: boolean;
    latexWrap?: string;
  }
}
