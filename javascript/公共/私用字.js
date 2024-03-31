document.addEventListener("DOMContentLoaded", () => {
    全HTML私用字替換();
});

function 全HTML私用字替換() {
    fetch("/json/公共/私用字辭典.json")
        .then((response) => response.json())
        .then((私用字辭典) => {
            const 是十六進制碼點 = (value) => {
                if (typeof value === "number" && !isNaN(value)) {
                    return true;
                }
                if (typeof value === "string") {
                    const hexPattern = /^0x[0-9A-Fa-f]+$/; // 正則表達式匹配十六進制格式
                    return hexPattern.test(value);
                }
                return false;
            };

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
                    node.data = node.data.replace(
                        regex,
                        (match, key, index) => {
                            index = parseInt(index, 10);
                            if (
                                轉換字典.hasOwnProperty(key) &&
                                index < 轉換字典[key].length
                            ) {
                                return 轉換字典[key][index];
                            }
                            return match;
                        }
                    );
                } else if (node.nodeType === 1) {
                    node.childNodes.forEach((childNode) =>
                        HTML內私用字替換(childNode)
                    );
                }
            }
        });
}
