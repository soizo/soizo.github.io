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
                Array.from(node.childNodes).forEach(replaceTextWithImages);
            }
        }
    }

    function replaceTextInTextNode(textNode) {
        const regexEmoji = /\:\=\&(.+?)\=\:/g;
        const regexImg = /\:=\&(.+?)\&=\:/g;
        let modifiedText = textNode.data;

        // 替換 :=&絵文字&=:
        modifiedText = modifiedText.replace(regexImg, (match, content) => {
            return `<img s-src="${content}" class="絵文字圖象" draggable="false" style="height: 1em;width: 1em;image-rendering: pixelated;border-radius: 2.5px;">`;
        });

        // 替換 :=&絵文字名稱=:
        modifiedText = modifiedText.replace(regexEmoji, (match, imageName) => {
            const imgSrc = `/assets/絵文字/${imageName}.png`;
            return `<img src="${imgSrc}" class="絵文字圖象" draggable="false" style="height: 1em;width: 1em;image-rendering: pixelated;border-radius: 2.5px;">`;
        });

        if (modifiedText !== textNode.data) {
            const wrapper = document.createElement("span");
            wrapper.innerHTML = modifiedText;
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    }

    replaceTextWithImages(document.body);
}
