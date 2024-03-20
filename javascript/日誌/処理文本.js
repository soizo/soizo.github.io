(async () => {
  const 原始文件 = await 異步抓取文件("./assets/日誌.txt");

  var 最終 = 処理(原始文件);

  var 日誌內容 = document.getElementById("日誌內容");
  日誌內容.innerHTML = 最終;
})();

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
    return "輸入格式錯誤";
  }

  const monthName = monthNames[month - 1];
  const dayName =
    day <= 10
      ? dayNames[day - 1]
      : day <= 20
      ? "十" + dayNames[day - 11]
      : dayNames[day - 1];

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

function 內容替換(文本) {
  let 輸出 = 文本;
  輸出 = 輸出.replace(/[\r\n]+$/g, "").replace(/\r\n/g, "</br>");
  let 匹配結果 = 輸出.match(/\<全角\=[a-zA-Z]+\=全角\>/g);

  if (匹配結果 && 匹配結果.length > 0) {
    匹配結果.forEach((匹配項) => {
      let 需要轉換的文本 = 匹配項.slice(4, -4);
      let 全角文本 = toFullWidth(需要轉換的文本);
      輸出 = 輸出.replace(匹配項, 全角文本);
    });
  }
  輸出 = replaceRubyFormat(輸出);

  return 輸出;
}

function 日期替換(文本輸入) {
  let 文本 = 文本輸入;
  let 文本match = 文本.match(/(?<=\d{4}\/)\d{2}\/\d{2}/)[0];
  文本 = 文本.replace(文本match, formatToChineseDate(文本match));
  文本 = replaceTextWithDictionary(文本, 中華日期漢字);
  文本 = replaceTextWithDictionary(文本, 七曜);
  return 文本;
}

function 処理(文本) {
  let 分割後的列表 = 文本
    .split(/(\r\n)?\/---\/(\r\n)?/gm)
    .filter(function (value) {
      if (value != "\r\n") return value;
    });
  let 修改後的列表 = 分割後的列表.map((項) => {
    let 更改 = 項
      .split(/(?<=(^[^\r\n]+))\r\n/g)
      .filter(function (v, i) {
        return i != 0;
      })
      .map(function (v, i) {
        let vl = v;
        if (i == 0) {
          return "<p class='日期'>" + 日期替換(vl) + "</p>";
        } else {
          return "<p class='內容'>" + 內容替換(vl) + "</p>";
        }
      })
      .join("");
    return 更改;
  });

  修改後的列表 = 修改後的列表.reverse().map((item, index, arr) => {
    const regex = /(?<=\<p class\=\'日期\'\>.+).{4}・.{4}(?=.+)/;
    const match = item.match(regex);
    let newItem = item;

    if (index === 0) {
      newItem = "<hr class='轉日'></hr>" + newItem;
    }

    if (match) {
      const dateString = match[0];
      if (index < arr.length - 1 && arr[index + 1].includes(dateString)) {
        newItem += "<hr class='同日'></hr>";
      } else if (index !== arr.length - 1) {
        newItem += "<hr class='轉日'></hr>";
      }
    }

    return newItem;
  });

  修改後的列表 = 修改後的列表.join("");
  return 修改後的列表;
}
