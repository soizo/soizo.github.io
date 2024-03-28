const pages = ["某一個", "某二個", "某三個"];

const params = new URLSearchParams(window.location.search);
const title = params.get("title");

function replaceRubyFormat(input) {
  const reg括號 = /(.+?)（([^：（）]+)：([^：（）]+)）/g;
  return input.replace(reg括號, (match, prefix, BB, CCC) => {
    const startPos = prefix.length - BB.length;
    const AA = prefix.substring(startPos);
    if (AA === BB) {
      return `${prefix.substring(
        0,
        startPos
      )}<ruby>${AA}<rt>${CCC}</rt></ruby>`;
    } else {
      return match;
    }
  });
}

function 全角替換(input) {
  var output = input;
  let 匹配結果 = output.match(/\<全角\=[0-9a-zA-Z ]*?\=全角\>/g);
  if (匹配結果 && 匹配結果.length > 0) {
    匹配結果.forEach((匹配項) => {
      let 需要轉換的文本 = 匹配項.slice(4, -4);
      let 全角文本 = toFullWidth(需要轉換的文本);
      output = output.replace(匹配項, 全角文本);
    });
  }
  return output;
}

function showError(message) {
  const errorMessage = document.createElement("div");
  errorMessage.id = "錯誤介面";
  errorMessage.innerHTML = `
  <link rel="preload" href="/fonts/閹割unifont.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  <h1 class="unselectable">抱歉︕</h1>
  <p class="unselectable">出錯了︐可能是䈎面不存在︰</p>
  <p>${message}</p>
  `;
  document.getElementById("content").innerHTML = "";
  document.getElementById("content").appendChild(errorMessage);
}

if (title) {
  fetch(`wiki/${title}.md`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("䈎面不存在");
      }
      return response.text();
    })
    .then((text) => {
      const converter = new showdown.Converter();
      var html = converter.makeHtml(text);
      html = html.replace(
        /(?<!\\)-(?<!\\)-(.+?)(?<!\\)-(?<!\\)-/g,
        (match, p1) => `<u>${p1}</u>`
      );
      html = replaceRubyFormat(html);
      html = html.replace(/(?<!\\)\\spc/, "　");
      html = 全角替換(html);
      document.getElementById("content").innerHTML =
        `<div id="MD外部"><div id="MD內部">` + html + `</div></div>`;
      window.全HTML私用字替換();
      window.全HTML絵文字替換();
    })
    .catch((error) => {
      showError(title);
    });
} else {
  const list = document.createElement("div");
  list.id = "page-list";
  list.innerHTML =
    "<h2>所有䈎面</h2><ul>" +
    pages
      .map((page) => `<li><a href="?title=${page}">${page}</a></li>`)
      .join("") +
    "</ul>";
  document.getElementById("content").appendChild(list);
}
