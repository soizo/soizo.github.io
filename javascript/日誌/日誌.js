function 複製今日道曆() {
    try {
        const textToCopy =
            轉換道曆(new Date(), 1, `/---/\nwww\tyyyy/mm/dd/`) +
            window.填充0(new Date().getHours(), 2) +
            ":" +
            window.填充0(new Date().getMinutes(), 2);
        navigator.clipboard.writeText(textToCopy);
    } catch (err) {}
}
function 刷新网䈎() {
    location.reload(true);
}
(async () => {
    const 中華日期漢字 = {
        0: "〇",
        1: "壹",
        2: "貳",
        3: "叄",
        4: "肆",
        5: "伍",
        6: "陸",
        7: "柒",
        8: "捌",
        9: "玖",
        "/": "・",
    };

    const 七曜 = {
        SUN: "㊐",
        MON: "㊊",
        TUE: "㊋",
        WED: "㊌",
        THU: "㊍",
        FRI: "㊎",
        SAT: "㊏",
    };

    function formatToChineseDate(dateString) {
        const monthNames = [
            "正月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "冬月",
            "臘月",
        ];
        const dayNames = [
            "初一",
            "初二",
            "初三",
            "初四",
            "初五",
            "初六",
            "初七",
            "初八",
            "初九",
            "初十",
            "十一",
            "十二",
            "十三",
            "十四",
            "十五",
            "十六",
            "十七",
            "十八",
            "十九",
            "二十",
            "廿一",
            "廿二",
            "廿三",
            "廿四",
            "廿五",
            "廿六",
            "廿七",
            "廿八",
            "廿九",
            "三十",
        ];

        const parts = dateString.split("/");
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);

        if (month < 1 || month > 12 || day < 1 || day > 31) {
            console.error("輸入格式錯誤");
            return;
        }

        const monthName = monthNames[month - 1];
        const dayName = dayNames[day];

        return monthName + dayName;
    }

    function replaceRubyFormat(input) {
        const reg括號 = /(.+?)（([^：（）]+)：([^：（）]+)）/g;
        return input.replace(reg括號, (match, prefix, BB, CCC) => {
            const startPos = prefix.length - BB.length;
            const AA = prefix.substring(startPos);
            if (AA === BB) {
                return `${prefix.substring(
                    0,
                    startPos
                )}<ruby>${AA}<rt>${CCC}</rt></ruby>`;
            } else {
                return match;
            }
        });
    }

    function 全角替換(input) {
        var output = input;
        let 匹配結果 = output.match(/\<全角\=[0-9a-zA-Z ]*?\=全角\>/g);
        if (匹配結果 && 匹配結果.length > 0) {
            匹配結果.forEach((匹配項) => {
                let 需要轉換的文本 = 匹配項.slice(4, -4);
                let 全角文本 = toFullWidth(需要轉換的文本);
                output = output.replace(匹配項, 全角文本);
            });
        }
        return output;
    }

    function 內容替換(文本) {
        if (!文本 || 文本 == "") {
            return "";
        }
        let 輸出 = 文本;
        function checkClassInHtmlString(htmlString, className) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = htmlString;
            return Array.from(tempDiv.childNodes).some((node) => {
                return (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.classList.contains(className)
                );
            });
        }
        if (checkClassInHtmlString(文本, "塊")) {
            輸出 = 輸出.replace(/((?<=\>)\s+)|(\s+(?=\<))/g, "");
        }
        輸出 = 輸出.replace(/([\r\n]+$)/g, "");
        輸出 = 全角替換(輸出);
        輸出 = replaceRubyFormat(輸出);
        function 豎排符號一下(inputString) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(inputString, "text/html");
            const body = doc.body;

            function processNode(node) {
                if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.classList.contains("橫")
                ) {
                    return;
                }

                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = replaceTextWithDictionary(
                        node.textContent,
                        豎排符號
                    );
                }

                node.childNodes.forEach(processNode);
            }

            processNode(body);

            return body.innerHTML;
        }

        return 輸出;
    }

    function 日期替換(文本) {
        if (!文本 || 文本 == "") {
            return "";
        }
        const 曜 = replaceTextWithDictionary(
            文本.match(/SUN|MON|TUE|WED|THU|FRI|SAT/g)[0],
            七曜
        );
        const 時間 = (function () {
            const 時間 = 文本.match(/\d{2}\:\d{2}/);
            if (時間) {
                return 時間[0];
            } else {
                return null;
            }
        })();
        const 日期 = 文本.match(/\d{4}\/\d{2}\/\d{2}/)[0];
        const 今日 = window.轉換道曆(new Date(), false, "YYYY/MM/DD");
        function calculateTimeDifferenceInSeconds(
            timeString,
            comparisonDateTime
        ) {
            // 將提供的時間字串轉換為日期對象的時間部分
            const [hours, minutes] = timeString.split(":").map(Number);
            const targetTime = new Date(comparisonDateTime);
            targetTime.setHours(hours, minutes, 0, 0);

            // 獲取要比較的日期時間值
            const comparisonTime = new Date(comparisonDateTime);

            // 計算差異（以毫秒為單位），然後轉換為秒
            const difference = (targetTime - comparisonTime) / 1000;

            return Math.abs(Math.round(difference));
        }

        const 返回日期 = (function () {
            if (日期 == 今日) {
                if (時間) {
                    const 時間差 = calculateTimeDifferenceInSeconds(
                        時間,
                        new Date()
                    );
                    const 小時差 = 時間差 / 3600;
                    const 分鐘差 = 時間差 / 60;
                    if (小時差 > 2) {
                        return (
                            window.numberToChinese(Math.floor(小時差 / 2)) +
                            "時" +
                            (小時差 % 2 == 0
                                ? "歬" + window.轉換道曆(Date(時間), true, "QQ")
                                : "半歬")
                        );
                    } else if (小時差 > 1) {
                        return "半時歬";
                    } else if (分鐘差 > 14.24) {
                        return (
                            window.numberToChinese(Math.floor(分鐘差 / 14.24)) +
                            "刻歬"
                        );
                    } else if (分鐘差 > 7.12) {
                        return "半刻歬";
                    } else if (分鐘差 > 2) {
                        return (
                            window.numberToChinese(Math.floor(分鐘差)) +
                            "分鐘歬"
                        );
                    } else {
                        return "只今";
                    }
                } else {
                    return "今日";
                }
            } else {
                ///是否今月
                let 顯_時間 = 時間
                    ? window.轉換道曆(
                          (() => {
                              const date = new Date();
                              date.setHours(parseInt(時間.split(":")[0]));
                              date.setMinutes(parseInt(時間.split(":")[1]));
                              return date;
                          })(),
                          true,
                          "HHQQ"
                      )
                    : "";
                if (Number(日期.split("/")[1]) == Number(今日.split("/")[1])) {
                    const 幾日歬 =
                        Number(今日.split("/")[2]) - Number(日期.split("/")[2]);
                    const 顯_幾日歬 = (function () {
                        if (幾日歬 == 1) {
                            return `昨日`;
                        } else {
                            return window.numberToChinese(幾日歬) + `日歬`;
                        }
                    })();
                    return 顯_幾日歬 + 顯_時間;
                } else {
                    return (
                        (Number(日期.split("/")[0]) ==
                        Number(今日.split("/")[0])
                            ? ""
                            : replaceTextWithDictionary(
                                  日期.split("/")[0],
                                  中華日期漢字
                              ) + `年`) +
                        formatToChineseDate(
                            日期.split("/").slice(1).join("/")
                        ) +
                        顯_時間
                    );
                }
            }
        })();

        return 曜 + " " + 返回日期;
        // console.log(文本輸入);
        // let 文本 = 文本輸入;
        // let 文本match = 文本.match(/(?<=\d{4}\/)\d{2}\/\d{2}/)[0];
        // 文本 = 文本.replace(文本match, formatToChineseDate(文本match));
        // 文本 = replaceTextWithDictionary(文本, 中華日期漢字);
        // 文本 = replaceTextWithDictionary(文本, 七曜);
        // return 文本;
    }

    function 処理(文本) {
        if (!文本 || 文本 == "") {
            return "";
        }
        const 每分割 = 文本
            .split(/(\r\n)?\/---\/(\r\n)?/gm)
            .filter(function (value) {
                if (value != "\r\n") return value;
            });
        const 分割單 = 每分割.map((v, i, a) => {
            const vWithNoEnters = v
                .replace(/^[\r\n]+/, "")
                .replace(/[\r\n]+$/, "");
            return [
                vWithNoEnters.split(/\n|\r\n/)[0],
                vWithNoEnters
                    .split(/\n|\r\n/)
                    .slice(1)
                    .join("\r\n")
                    .replace(/^[\r\n]+/, "")
                    .replace(/[\r\n]+$/, ""),
            ];
        });
        const 轉HTML = 分割單.reverse().map((v, i, a) => {
            const regex = /\d{4}\/\d{2}\/\d{2}/g;
            return (
                `<div class='日期'>${日期替換(v[0])}</div>` +
                `<div class='內容'>${內容替換(v[1])}</div>` +
                ((i < a.length - 1 &&
                    v[0].match(regex)[0] == a[i + 1][0].match(regex)[0]) ||
                i == a.length - 1
                    ? ""
                    : `<hr class='轉日'>`)
            );
        });
        return `<hr class='轉日'>` + 轉HTML.join("");
    }

    const 原始文件 = await 異步抓取文件("/assets/日誌.txt");
    // console.log(原始文件);
    var 最終 = 処理(原始文件);
    var 日誌內容 = document.getElementById("日誌內容");
    日誌內容.innerHTML = 最終;

    if (window.絵文字替換) {
        window.絵文字替換(日誌內容);
    }
})();
