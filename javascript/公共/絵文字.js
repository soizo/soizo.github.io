document.addEventListener("DOMContentLoaded", () => {
  // 在文檔加載完成後，立即運行一次對整個文檔體的處理
  replaceTextWithImages(document.body);
});

// 將replaceTextWithImages函數暴露到全局作用域
window.絵文字替換 = replaceTextWithImages;

function replaceTextWithImages(node) {
  if (node.nodeType === 3) {
    // 處理文本節點
    replaceTextInTextNode(node);
  } else if (node.nodeType === 1) {
    // 處理元素節點
    if (
      node.tagName.toUpperCase() !== "SCRIPT" &&
      node.tagName.toUpperCase() !== "STYLE"
    ) {
      if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
        replaceTextInTextNode(node.childNodes[0]);
      } else {
        Array.from(node.childNodes).forEach((childNode) =>
          replaceTextWithImages(childNode)
        );
      }
    }
  }
}

function replaceTextInTextNode(textNode) {
  const regex = /\:\=\&(.+?)\=\:/g; // 匹配絵文字代碼的正則表達式
  let modifiedText = textNode.data.replace(regex, (match, imageName) => {
    const imgSrc = `/assets/絵文字/${imageName}.gif`; // 組裝圖片的源地址
    return `<img src="${imgSrc}" class="絵文字圖象" draggable="false">`; // 返回替換文本的HTML
  });

  if (modifiedText !== textNode.data) {
    const wrapper = document.createElement("span");
    wrapper.innerHTML = modifiedText;
    textNode.parentNode.replaceChild(wrapper, textNode);
  }
}
