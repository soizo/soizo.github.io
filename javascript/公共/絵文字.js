document.addEventListener("DOMContentLoaded", () => {
  全HTML絵文字替換(document.body);
});

function 全HTML絵文字替換() {
  function replaceTextWithImages(node) {
    if (node.nodeType === 3) {
      replaceTextInTextNode(node);
    } else if (node.nodeType === 1) {
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
    const regex = /\:\=\&(.+?)\=\:/g;
    let modifiedText = textNode.data.replace(regex, (match, imageName) => {
      const imgSrc = `/assets/絵文字/${imageName}.png`;
      return `<img src="${imgSrc}" class="絵文字圖象" draggable="false" style="height: 1em;width: 1em;image-rendering: pixelated;border-radius: 2.5px;">`; // 返回替換文本的HTML
    });

    if (modifiedText !== textNode.data) {
      const wrapper = document.createElement("span");
      wrapper.innerHTML = modifiedText;
      textNode.parentNode.replaceChild(wrapper, textNode);
    }
  }

  replaceTextWithImages(document.body);
}
