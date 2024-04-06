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
                    const hexPattern = /^0x[0-9A-Fa-f]+$/;
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

            // 新增的扁對應表
            const 扁對應表 = {
                〇: String.fromCodePoint(0x100000),
                一: String.fromCodePoint(0x100001),
                二: String.fromCodePoint(0x100002),
                三: String.fromCodePoint(0x100003),
                四: String.fromCodePoint(0x100004),
                五: String.fromCodePoint(0x100005),
                六: String.fromCodePoint(0x100006),
                七: String.fromCodePoint(0x100007),
                八: String.fromCodePoint(0x100008),
                九: String.fromCodePoint(0x100009),
                十: String.fromCodePoint(0x10000A),
                廿: String.fromCodePoint(0x10000B),
                零: String.fromCodePoint(0x100010),
                壹: String.fromCodePoint(0x100011),
                貳: String.fromCodePoint(0x100012),
                叄: String.fromCodePoint(0x100013),
                肆: String.fromCodePoint(0x100014),
                伍: String.fromCodePoint(0x100015),
                陸: String.fromCodePoint(0x100016),
                柒: String.fromCodePoint(0x100017),
                捌: String.fromCodePoint(0x100018),
                玖: String.fromCodePoint(0x100019),
                拾: String.fromCodePoint(0x10001A),
                陽: String.fromCodePoint(0x100022),
                陰: String.fromCodePoint(0x100023),
                天: String.fromCodePoint(0x100024),
                地: String.fromCodePoint(0x100025),
                人: String.fromCodePoint(0x100026),
                初: String.fromCodePoint(0x100027),
                正: String.fromCodePoint(0x100028),
                年: String.fromCodePoint(0x100040),
                月: String.fromCodePoint(0x100041),
                日: String.fromCodePoint(0x100042),
                時: String.fromCodePoint(0x100043),
                刻: String.fromCodePoint(0x100044),
                甲: String.fromCodePoint(0x100050),
                乙: String.fromCodePoint(0x100051),
                丙: String.fromCodePoint(0x100052),
                丁: String.fromCodePoint(0x100053),
                戊: String.fromCodePoint(0x100054),
                己: String.fromCodePoint(0x100055),
                庚: String.fromCodePoint(0x100056),
                辛: String.fromCodePoint(0x100057),
                壬: String.fromCodePoint(0x100058),
                癸: String.fromCodePoint(0x100059),
                子: String.fromCodePoint(0x10005A),
                丑: String.fromCodePoint(0x10005B),
                寅: String.fromCodePoint(0x10005C),
                卯: String.fromCodePoint(0x10005D),
                辰: String.fromCodePoint(0x10005E),
                巳: String.fromCodePoint(0x10005F),
                午: String.fromCodePoint(0x100060),
                未: String.fromCodePoint(0x100061),
                申: String.fromCodePoint(0x100062),
                酉: String.fromCodePoint(0x100063),
                戌: String.fromCodePoint(0x100064),
                亥: String.fromCodePoint(0x100065),
            };

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
                    // 更新正則表達式以匹配新的替換模式
                    const regex = /\:\=([^\s\=]+?)\$(\d+|[^\s\d])\=\:/g;
                    node.data = node.data.replace(
                        regex,
                        (match, characters, indexOrType) => {
                            if (indexOrType === "扁") {
                                // 遍歷每一個字符並根據扁對應表進行替換
                                return characters
                                    .split("")
                                    .map(
                                        (character) =>
                                            扁對應表[character] || character
                                    )
                                    .join("");
                            } else {
                                const index = parseInt(indexOrType, 10);
                                if (
                                    轉換字典.hasOwnProperty(characters) &&
                                    index < 轉換字典[characters].length
                                ) {
                                    return 轉換字典[characters][index];
                                }
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
