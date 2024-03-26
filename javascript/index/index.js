// 初始化字典，使用十六進制碼點
const 私用字辭典 = {
  即: ["卽"],
  今: [0xf0000],
  龜: [0xf0001],
  臺: [0xf0002],
  鬱: [0xf0003],
};

// 轉換字典中的碼點為實際字符
const 是十六進制碼點 = (value) => typeof value === "number" && !isNaN(value);

// 轉換字典中的碼點或保留原文本
const 轉換字典 = Object.keys(私用字辭典).reduce((新字典, key) => {
  新字典[key] = 私用字辭典[key].map((value) =>
    是十六進制碼點(value) ? String.fromCodePoint(value) : value
  );
  return 新字典;
}, {});

document.addEventListener("DOMContentLoaded", () => {
  HTML內私用字替換(document.body);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node) => {
          HTML內私用字替換(node);
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  function HTML內私用字替換(node) {
    if (node.nodeType === 3) {
      // 文本節點
      const regex = /\:\=([^\s\=]+?)\$(\d+)\=\:/g;
      node.data = node.data.replace(regex, (match, key, index) => {
        index = parseInt(index, 10);
        if (轉換字典.hasOwnProperty(key) && index < 轉換字典[key].length) {
          return 轉換字典[key][index];
        }
        return match; // 如果沒找到，保留原始匹配
      });
    } else if (node.nodeType === 1) {
      // 元素節點
      node.childNodes.forEach((childNode) => HTML內私用字替換(childNode));
    }
  }
});
