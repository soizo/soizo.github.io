document.addEventListener("DOMContentLoaded", () => {
  replaceTextWithImages(document.body);
  function replaceTextWithImages(node) {
    if (node.nodeType === 3) {
      // 處理純文本節點
      replaceTextInNode(node);
    } else if (
      node.nodeType === 1 &&
      node.tagName.toUpperCase() !== "SCRIPT" &&
      node.tagName.toUpperCase() !== "STYLE"
    ) {
      if (node.hasChildNodes()) {
        // 遞歸處理所有子節點
        Array.from(node.childNodes).forEach(replaceTextWithImages);
      } else {
        // 處理包含HTML的文本
        replaceTextInNode(node);
      }
    }
  }

  function replaceTextInNode(node) {
    const regex = /\:\=\&(.+?)\=\:/g;
    let textContent = node.nodeType === 3 ? node.data : node.innerHTML;
    const modifiedText = textContent.replace(regex, (match, imageName) => {
      const imgSrc = `/assets/絵文字/${imageName}.gif`;
      return `<img src="${imgSrc}" class="符號圖象" draggable="false">`;
    });

    if (modifiedText !== textContent) {
      if (node.nodeType === 3) {
        const wrapper = document.createElement("span");
        wrapper.innerHTML = modifiedText;
        node.parentNode.replaceChild(wrapper, node);
      } else {
        node.innerHTML = modifiedText;
      }
    }
  }
});
