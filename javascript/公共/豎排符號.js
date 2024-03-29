function 全HTML豎排符號替換() {
    fetch("/json/公共/豎排符號.json")
        .then((response) => response.json())
        .then((豎排符號) => {
            const replaceTextInNode = (node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    let text = node.nodeValue;
                    Object.entries(豎排符號).forEach(([key, value]) => {
                        text = text.replace(new RegExp(key, "g"), value);
                    });
                    node.nodeValue = text;
                } else if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.style.writingMode !== "horizontal-tb" &&
                    !node.classList.contains("橫")
                ) {
                    node.childNodes.forEach(replaceTextInNode);
                }
            };

            document.body.childNodes.forEach(replaceTextInNode);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    全HTML豎排符號替換();
});

document.addEventListener("DOMContentLoaded", function () {
    var 反向豎排符號 = {};

    fetch("/json/公共/豎排符號.json")
        .then((response) => response.json())
        .then((豎排符號) => {
            
            Object.entries(豎排符號).forEach(([key, value]) => {
                反向豎排符號[value] = key;
            });

            
            document.addEventListener("copy", function (e) {
                var selectedText = window.getSelection().toString();

                if (selectedText) {
                    e.preventDefault();
                    var clipboardData = e.clipboardData || window.clipboardData;
                    var customCopyText = replaceTextWithDictionary(
                        selectedText,
                        反向豎排符號
                    );
                    clipboardData.setData("text/plain", customCopyText);
                }
            });

            function replaceTextWithDictionary(text, dictionary) {
                return Object.entries(dictionary).reduce(
                    (acc, [key, value]) => {
                        return acc.replace(new RegExp(key, "g"), value);
                    },
                    text
                );
            }
        });
});
