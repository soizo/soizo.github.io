鏈結定位("/json/公共/圖象索引.json");

document.addEventListener("DOMContentLoaded", function () {
    const 遮擋元素們 = document.querySelectorAll(".遮擋下");
    鏈結定位("/json/公共/圖象索引.json");
    遮擋元素們.forEach((遮擋元素) => {
        遮擋元素.classList.add("遮擋有");

        遮擋元素.addEventListener("mouseenter", function () {
            this.classList.add("遮擋空");
            this.classList.remove("遮擋有");
        });

        遮擋元素.addEventListener("mouseleave", function () {
            if (!window.getSelection().toString()) {
                this.classList.remove("遮擋空");
                this.classList.add("遮擋有");
            }
        });

        document.addEventListener("click", function (e) {
            const 在遮擋元素內 = e.target.closest(".遮擋下");
            遮擋元素們.forEach((elem) => {
                if (elem === 在遮擋元素內) {
                    elem.classList.add("遮擋空");
                    elem.classList.remove("遮擋有");
                } else if (!window.getSelection().toString()) {
                    elem.classList.remove("遮擋空");
                    elem.classList.add("遮擋有");
                }
            });
        });
    });
});

/**                 執   行   區                 **/

function 鏈結定位(path) {
    fetch(path)
        .then((response) => response.json())
        .then((data) => {
            const 平面data = 展開嵌套結構(data);
            function isValidHttpUrl(string) {
                let url;
                try {
                    url = new URL(string);
                } catch (_) {
                    return false;
                }
                return url.protocol === "http:" || url.protocol === "https:";
            }

            const hrefElements = document.querySelectorAll("[s-href]");
            hrefElements.forEach((element) => {
                const key = element.getAttribute("s-href");
                if (isValidHttpUrl(key)) {
                    element.href = key;
                } else if (平面data[key]) {
                    element.setAttribute("href", 平面data[key]);
                }
            });

            const srcElements = document.querySelectorAll("[s-src]");
            srcElements.forEach((element) => {
                const key = element.getAttribute("s-src");
                if (isValidHttpUrl(key)) {
                    element.src = key;
                } else if (平面data[key]) {
                    element.setAttribute("src", 平面data[key]);
                }
            });

            const allCatboxElements =
                document.querySelectorAll("[s-href], [s-src]");
            allCatboxElements.forEach((element) => {
                const hrefKey = element.getAttribute("s-href");
                const srcKey = element.getAttribute("s-src");
                if (hrefKey && !isValidHttpUrl(hrefKey) && 平面data[hrefKey]) {
                    element.setAttribute("href", 平面data[hrefKey]);
                }
                if (srcKey && !isValidHttpUrl(srcKey) && 平面data[srcKey]) {
                    element.setAttribute("src", 平面data[srcKey]);
                }
            });
        })
        .catch((error) => console.error("讀取素繒錯誤：", error));
}

function 展開嵌套結構(對象, 前綴 = "") {
    return Object.entries(對象).reduce((結果, [鍵, 值]) => {
        const 新鍵 = 前綴 ? `${前綴}：${鍵}` : 鍵;
        if (typeof 值 === "object" && 值 !== null && !Array.isArray(值)) {
            Object.assign(結果, 展開嵌套結構(值, 新鍵));
        } else {
            結果[新鍵] = 值;
        }
        return 結果;
    }, {});
}

async function 異步抓取文件(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("网絡或路徑爛 爆 了！");
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("文件讀取失敗：", error);
        return null;
    }
}

function replaceTextWithDictionary(text, dictionary) {
    const lowerCaseDictionary = Object.keys(dictionary).reduce((acc, key) => {
        acc[key.toLowerCase()] = dictionary[key];
        return acc;
    }, {});

    const pattern = new RegExp(
        Object.keys(lowerCaseDictionary).join("|"),
        "gi"
    );
    return text.replace(pattern, (matched) => {
        const replacement = lowerCaseDictionary[matched.toLowerCase()];
        return replacement;
    });
}

function toFullWidth(str) {
    if (typeof str !== "string") {
        return "";
    }

    var fullWidthStr = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) === 32) {
            fullWidthStr += String.fromCharCode(12288);
        } else if (str.charCodeAt(i) >= 33 && str.charCodeAt(i) <= 126) {
            fullWidthStr += String.fromCharCode(str.charCodeAt(i) + 65248);
        } else {
            fullWidthStr += str.charAt(i);
        }
    }
    return fullWidthStr;
}

function formatDate年月日(DATE) {
    const dateObj = typeof DATE === "string" ? new Date(DATE) : DATE;

    if (isNaN(dateObj.getTime())) {
        return "Invalid Date";
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function findPosition(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}

function convertToLunar(DATE, trans = true) {
    var lunarInfo = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
        0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
        0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
        0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
        0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
        0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573,
        0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
        0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
        0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
        0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
        0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
        0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
        0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
        0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0,
        0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
        0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    ];

    function lYearDays(y) {
        var i,
            sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1)
            sum += lunarInfo[y - 1900] & i ? 1 : 0;
        return sum + leapDays(y);
    }

    function leapDays(y) {
        if (leapMonth(y)) return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        else return 0;
    }

    function leapMonth(y) {
        return lunarInfo[y - 1900] & 0xf;
    }

    function monthDays(y, m) {
        return lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
    }

    function Lunar(objDate) {
        var i,
            leap = 0,
            temp = 0;
        var baseDate = new Date(1900, 0, 31);
        var offset = (objDate - baseDate) / 86400000;

        this.dayCyl = offset + 40;
        this.monCyl = 14;

        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
            this.monCyl += 12;
        }

        if (offset < 0) {
            offset += temp;
            i--;
            this.monCyl -= 12;
        }

        this.year = i;
        this.yearCyl = i - 1864;

        leap = leapMonth(i);
        this.isLeap = false;

        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == leap + 1 && this.isLeap == false) {
                --i;
                this.isLeap = true;
                temp = leapDays(this.year);
            } else {
                temp = monthDays(this.year, i);
            }

            if (this.isLeap == true && i == leap + 1) this.isLeap = false;

            offset -= temp;
            if (this.isLeap == false) this.monCyl++;
        }

        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap) {
                this.isLeap = false;
            } else {
                this.isLeap = true;
                --i;
                --this.monCyl;
            }

        if (offset < 0) {
            offset += temp;
            --i;
            --this.monCyl;
        }

        this.month = i;
        this.day = offset + 1;
    }

    function getLunarDateStr(date) {
        var numString = "十一二三四五六七八九十";
        var lMString = "正二三四五六七八九十冬臘";
        var tY = date.getFullYear();
        var tM = date.getMonth();
        var tD = date.getDate();
        var l = new Lunar(date);
        var lM = l.month.toFixed(0);
        var pre = l.isLeap ? "閏" : "";
        var mStr = pre + lMString[lM - 1] + "月";
        var lD = l.day.toFixed(0) - 1;
        pre = lD <= 10 ? "初" : lD <= 19 ? "十" : lD <= 29 ? "廿" : "三";
        var dStr = pre + numString[lD % 10];
        return mStr + dStr;
    }

    function Lunar字串(date) {
        let 模子 = new Lunar(date);
        let 輸出 = [];
        輸出.push(+模子.month.toFixed(0), +模子.day.toFixed(0));
        return 輸出;
    }
    if (trans) {
        return getLunarDateStr(DATE);
    } else {
        return Lunar字串(DATE);
    }
}

function 轉換道曆(input, trans = true, 格式) {
    /////////////時刻
    /// 輸入
    const DATE = new Date(input);
    if (isNaN(DATE.getTime())) {
        console.error("无法轉換爲有效時間");
    }
    /// 常數
    let 地_地支, 地_刻, 地_初正;
    if (trans) {
        地_地支 = "子丑寅卯辰巳午未申酉戌亥子";
        地_刻 = "初一二三四";
        地_初正 = "正初";
    } else {
        地_地支 = "ABCDEFGHIJKLA";
        地_刻 = "01234";
        地_初正 = "VI";
    }

    const 時間列表 = [
        0x0, 0x360, 0x6c0, 0xa20, 0xd80, 0xe10, 0x10e0, 0x1440, 0x17a0, 0x1b00,
        0x1c20, 0x1e60, 0x21c0, 0x2520, 0x2880, 0x2a30, 0x2be0, 0x2f40, 0x32a0,
        0x3600, 0x3840, 0x3960, 0x3cc0, 0x4020, 0x4380, 0x4650, 0x46e0, 0x4a40,
        0x4da0, 0x5100, 0x5460, 0x57c0, 0x5b20, 0x5e80, 0x61e0, 0x6270, 0x6540,
        0x68a0, 0x6c00, 0x6f60, 0x7080, 0x72c0, 0x7620, 0x7980, 0x7ce0, 0x7e90,
        0x8040, 0x83a0, 0x8700, 0x8a60, 0x8ca0, 0x8dc0, 0x9120, 0x9480, 0x97e0,
        0x9ab0, 0x9b40, 0x9ea0, 0xa200, 0xa560, 0xa8c0, 0xac20, 0xaf80, 0xb2e0,
        0xb640, 0xb6d0, 0xb9a0, 0xbd00, 0xc060, 0xc3c0, 0xc4e0, 0xc720, 0xca80,
        0xcde0, 0xd140, 0xd2f0, 0xd4a0, 0xd800, 0xdb60, 0xdec0, 0xe100, 0xe220,
        0xe580, 0xe8e0, 0xec40, 0xef10, 0xefa0, 0xf300, 0xf660, 0xf9c0, 0xfd20,
        0x10080, 0x103e0, 0x10740, 0x10aa0, 0x10b30, 0x10e00, 0x11160, 0x114c0,
        0x11820, 0x11940, 0x11b80, 0x11ee0, 0x12240, 0x125a0, 0x12750, 0x12900,
        0x12c60, 0x12fc0, 0x13320, 0x13560, 0x13680, 0x139e0, 0x13d40, 0x140a0,
        0x14370, 0x14400, 0x14760, 0x14ac0, 0x14e20, 0x15f90,
    ];

    let 小時 = DATE.getHours();
    let 分鐘 = DATE.getMinutes();
    let 秒 = DATE.getSeconds();

    /// 時
    let 大時序 = Math.floor((小時 + 1) / 2) % 12;
    let 今時 = 小時 * 60 * 60 + 分鐘 * 60 + 秒;
    let 位置 = findPosition(時間列表, 今時);

    /// 列表問題
    if (位置 < 0) {
        console.error(`目標數字超出列表範圍`);
    }

    刻序 = (位置 - 1) % 5;
    if (位置 <= 0) {
        刻序 = 0;
    }

    /// 顯
    let 顯_大時 = 地_地支[大時序];
    let 顯_初正 = 地_初正[小時 % 2];
    let 顯_刻 = 地_刻[刻序];
    let 顯_刻字 = trans ? "刻" : "";
    /////////////年月
    var 道曆年數 = DATE.getFullYear() + 2697;
    if ((DATE.getMonth() < 3) & (convertToLunar(DATE, 0)[1] >= 11)) {
        道曆年數 -= 1;
    }
    const 年數字 = {
        0: "〇",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
    };

    function convert_Year_To_2_char_Chinese(year, ttrans = true) {
        let heavenlyStems, earthlyBranches;
        if (ttrans) {
            heavenlyStems = "甲乙丙丁戊己庚辛壬癸";
            earthlyBranches = "子丑寅卯辰巳午未申酉戌亥";
        } else {
            heavenlyStems = "ABCDEFGHIJ";
            earthlyBranches = "ABCDEFGHIJKL";
        }

        const baseYear = 1984;
        const offset = year - baseYear;
        const stem = heavenlyStems.charAt(offset % 10);
        const branch = earthlyBranches.charAt(offset % 12);

        return stem + branch;
    }

    function 曜日曆法(num, type = 0, ttrans) {
        const 曜日 = ["日月火水木金土", "㊐㊊㊋㊌㊍㊎㊏"];
        return 曜日[type][num];
    }

    var 輸出 = [];

    var 顯_年 = 道曆年數;
    var 顯_月日 = convertToLunar(DATE, trans);
    var 週 = DATE.getDay();
    if (trans) {
        let 顯_月日tmp = 顯_月日;
        顯_月日 = [];
        顯_月日.push(
            顯_月日tmp[0] + 顯_月日tmp[1],
            顯_月日tmp[2] + 顯_月日tmp[3]
        );
        顯_年 = replaceTextWithDictionary(String(道曆年數), 年數字);
    }
    if (格式 === undefined) {
        輸出.push(
            顯_年,
            顯_月日[0],
            顯_月日[1],

            顯_大時 + 顯_初正,
            trans ? 顯_刻 + 顯_刻字 : +顯_刻
        );
    } else {
        var engdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        輸出 = 格式.replace(
            /\[干支\]|y+|Y+|m+|M+|D+|d+|W+|w+|H+|Q+/g,
            function (match) {
                if (match === "[干支]") {
                    return convert_Year_To_2_char_Chinese(
                        DATE.getFullYear(),
                        trans
                    );
                }
                switch (match[0]) {
                    case "Y": /// 年
                        switch (match.length) {
                            case 1:
                                return 顯_年;
                            case 2:
                                return 顯_年.substring(2);
                            case 3:
                                return 顯_年.substring(1);
                            default:
                                return 顯_年;
                        }
                    case "M": /// 月
                        switch (match.length) {
                            case 1:
                                return 顯_月日[0][0];
                            case 2:
                                return 顯_月日[0];
                            default:
                                return 顯_月日[0];
                        }
                    case "D": /// 日
                        return 顯_月日[1];
                    case "H": /// 时
                        switch (match.length) {
                            case 1:
                                return 顯_大時;
                            case 2:
                                return 顯_大時 + 顯_初正;
                            default:
                                return 顯_大時 + 顯_初正;
                        }
                    case "Q": /// 刻
                        switch (match.length) {
                            case 1:
                                return 顯_刻;
                            default:
                                return trans ? 顯_刻 + 顯_刻字 : +顯_刻;
                        }
                    case "W":
                        switch (match.length) {
                            case 1:
                                return trans ? 曜日曆法(週) : 週;
                            case 2:
                                return trans
                                    ? 曜日曆法(週) + "曜"
                                    : (週 < 10 ? "0" : "") + 週;
                            case 3:
                                return trans
                                    ? 曜日曆法(週) + "曜日"
                                    : engdays[週];
                            default:
                                return trans
                                    ? 曜日曆法(週) + "曜日"
                                    : (週 < 10 * (match.length - 1)
                                          ? "0".repeat(
                                                match.length - String(週).length
                                            )
                                          : "") + 週;
                        }
                    case "w":
                        if (trans) {
                            switch (match.length) {
                                case 3:
                                    return engdays[週];
                                default:
                                    return 曜日曆法(週, 1);
                            }
                        } else {
                            switch (match.length) {
                                case 1:
                                    return 週;
                                default:
                                    return engdays[週];
                            }
                        }
                    case "y":
                        switch (match.length) {
                            case 1:
                                return 道曆年數;
                            case 2:
                                return +String(道曆年數).substring(2);
                            case 3:
                                return +String(道曆年數).substring(1);
                            default:
                                return 道曆年數;
                        }
                    case "m":
                        const m = 轉換道曆(DATE, 0, undefined)[1];
                        return (
                            (m < 10 * (match.length - 1)
                                ? "0".repeat(match.length - String(m).length)
                                : "") + m
                        );
                    case "d":
                        const d = 轉換道曆(DATE, 0, undefined)[2];
                        return (
                            (d < 10 * (match.length - 1)
                                ? "0".repeat(match.length - String(d).length)
                                : "") + d
                        );
                }
            }
        );
    }
    return 輸出;
}

function addMobileWarning(test) {
    if (/iPhone|iPod|Android/i.test(navigator.userAgent) || test) {
        // 創建style元素
        const style = document.createElement("style");
        // 設置CSS內容
        style.textContent = ``;
        // 將style元素添加到head中
        document.head.appendChild(style);

        // 將HTML內容添加到body的最前面
        document.body.insertAdjacentHTML(
            "afterbegin",
            `
			<marquee
				id="手机端警告"
				class="unselectable"
				direction="up"
				scrollamount="30%"
				bgcolor="blue"
				onmouseover="this.stop();"
				onmouseout="this.start();"
				style="
					height: 100%;
					padding-left: 7px;
					padding-right: 5px;
					margin: 0;
					white-space: nowrap;
					font-family: '閹割unifont';
				"
			>
				<span style="font-size: 40px; color: white"
					>吿：手機端査看效果不佳！建議ＷＩＮＤＯＷＳ端ＣＨＲＯＭＥ內核瀏覽！</span
				>
			</marquee>
		`
        );
    }
}
