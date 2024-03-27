document.addEventListener("DOMContentLoaded", () => {
  // 确保在文档加载完毕后执行替换操作
  replaceTextWithImages(document.body);

  function replaceTextWithImages(node) {
    if (node.nodeType === 3) {
      // 如果是文本节点
      const regex = /\:\=\&(.+?)\=\:/g;
      let modifiedText = node.data;
      modifiedText = modifiedText.replace(regex, (match, imageName) => {
        const imgSrc = `/assets/符號/${imageName}.gif`;
        return `<img src="${imgSrc}" class="符號圖象 unselectable" draggable="false">`;
      });
      if (modifiedText !== node.data) {
        // 使用innerHTML需要创建一个包装元素，因为直接对文本节点设置innerHTML无效
        const wrapper = document.createElement("span");
        wrapper.innerHTML = modifiedText;
        node.parentNode.replaceChild(wrapper, node);
      }
    } else if (
      node.nodeType === 1 &&
      node.tagName.toUpperCase() !== "SCRIPT" &&
      node.tagName.toUpperCase() !== "STYLE"
    ) {
      // 递归处理所有子节点，排除<script>和<style>
      Array.from(node.childNodes).forEach((childNode) =>
        replaceTextWithImages(childNode)
      );
    }
  }
});
