const 私用字辭典 = {
  即: ["卽"],
  今: [0xf0000],
  龜: [0xf0001],
  臺: [0xf0002, 0xf0004],
  檯: [0xf0004],
  鬱: [0xf0003],
  酷: [0x31406],
};

document.addEventListener("DOMContentLoaded", () => {
  const 是十六進制碼點 = (value) => typeof value === "number" && !isNaN(value);

  const 轉換字典 = Object.keys(私用字辭典).reduce((新字典, key) => {
    新字典[key] = 私用字辭典[key].map((value) =>
      是十六進制碼點(value) ? String.fromCodePoint(value) : value
    );
    return 新字典;
  }, {});
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
      const regex = /\:\=([^\s\=]+?)\$(\d+)\=\:/g;
      node.data = node.data.replace(regex, (match, key, index) => {
        index = parseInt(index, 10);
        if (轉換字典.hasOwnProperty(key) && index < 轉換字典[key].length) {
          return 轉換字典[key][index];
        }
        return match;
      });
    } else if (node.nodeType === 1) {
      node.childNodes.forEach((childNode) => HTML內私用字替換(childNode));
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const 遮擋元素們 = document.querySelectorAll(".遮擋下");

  // 处理鼠标悬停事件
  遮擋元素們.forEach((遮擋元素) => {
    遮擋元素.classList.remove("hide-overlay");
    遮擋元素.classList.add("hide-children");
    遮擋元素.addEventListener("mouseenter", function () {
      this.classList.add("hide-overlay");
      this.classList.remove("hide-children");
    });
    遮擋元素.addEventListener("mouseleave", function () {
      if (!window.getSelection().toString()) {
        this.classList.remove("hide-overlay");
        this.classList.add("hide-children");
      }
    });
  });

  // 处理文本选择变化事件
  document.addEventListener("selectionchange", function () {
    const selectedText = window.getSelection().toString();
    遮擋元素們.forEach((遮擋元素) => {
      // 检查当前遮挡元素或其子元素是否包含选中的文本
      const isTextSelectedWithin =
        selectedText &&
        (遮擋元素.textContent.includes(selectedText) ||
          selectedText.includes(遮擋元素.textContent));
      // 添加或移除类以反映当前状态
      遮擋元素.classList.toggle("hide-overlay", isTextSelectedWithin);
      遮擋元素.classList.toggle("hide-children", !isTextSelectedWithin);
    });
  });
});
