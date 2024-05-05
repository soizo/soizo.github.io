var 替換方案 = {};
fetch("/apps/映射書文/json/替換方案.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        替換方案 = data;
        if (document.getElementById("inputText")) {
            映射書文應用();
        }
    });

const 符號大全 = ` 　.,·!?;:()．，（）●。“”"'|\\[]{}「」、！；：…—–-_*&^%$#@+=<>/~\`〈〉《》〔〕｛｝【】〖〗«»‹›◊※～©；：？•’`;

const 扁符號 = `􀀀􀀁􀀂􀀃􀀄􀀅􀀆􀀇􀀈􀀉􀀊􀀋􀀐􀀑􀀒􀀓􀀔􀀕􀀖􀀗􀀘􀀙􀀚􀀢􀀣􀀤􀀥􀀦􀀧􀀨􀁀􀁁􀁂􀁃􀁄􀁐􀁑􀁒􀁓􀁔􀁕􀁖􀁗􀁘􀁙􀁚􀁛􀁜􀁝􀁞􀁟􀁠􀁡􀁢􀁣􀁤􀁥`;

const 數字 = ["0123456789０１２３４５６７８９"];

const 字母大寫 =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ";

const 字母小寫 =
    "abcdefghijklmnopqrstuvwxyzαβγδεζηθικλμνξοπρστυφχψωабвгдежзийклмнопрстуфхцчшщъыьэюяａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";

const 字母大寫全角 = "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ";

const 字母小寫全角 = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";

const 不要的字符 = 符號大全 + 扁符號 + "\n" + "\r" + "\t" + "\r\t";

let 用戶改變了seed了嗎 = false;

function 映射書文(seed, meta) {
    const inputText = document.getElementById("inputText").value;
    const schemeName = document.getElementById("schemeSelector").value;
    const seedInput = document.getElementById("seed");
    const 隨機值 = document.querySelector(`body > label[name="隨機值"]`);
    let output = "";
    let charMap = {};
    let selectedScheme = "";
    if (schemeName.split("：")[0] == "項") {
        selectedScheme = 替換方案[schemeName.split("：")[1]];
        if (!selectedScheme) {
            document.getElementById("output").innerText = inputText;
            return;
        }
    }

    // 檢查用戶是否已設定種子
    if (seedInput.value) {
        seed = seedInput.value;
    } else if (seed) {
    } else {
        seed = Math.floor(Math.random() * 100000000);
        隨機值.innerText = seed;
    }

    // 種子處理，強制轉換為數字
    const seedNumber =
        Number(seed) == seed && !String(seed).includes(".")
            ? Number(seed)
            : String(seed)
                  .split("")
                  .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // 基於種子的偽隨機數生成器
    const seededRandom = (() => {
        var seed = seedNumber;
        return () => {
            var x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };
    })();

    const randomizeString = (str) => {
        let array = str.split("");
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join("");
    };

    const mapUpperCase = {};
    const mapLowerCase = {};
    const originalUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const originalLower = "abcdefghijklmnopqrstuvwxyz";

    // 隨機打亂拉丁字母用字
    const latinUpper = randomizeString(selectedScheme["拉丁字大寫用字"] || "");
    const latinLower = randomizeString(selectedScheme["拉丁字小寫用字"] || "");

    for (let i = 0; i < originalUpper.length; i++) {
        mapUpperCase[originalUpper[i]] = latinUpper[i] || originalUpper[i];
    }

    for (let i = 0; i < originalLower.length; i++) {
        mapLowerCase[originalLower[i]] = latinLower[i] || originalLower[i];
    }

    Object.assign(charMap, mapUpperCase, mapLowerCase);

    const numberMap = {};
    const numbers = "0123456789";
    const numberReplacement = randomizeString(selectedScheme["數字用字"] || "");

    for (let i = 0; i < numbers.length; i++) {
        numberMap[numbers[i]] =
            numberReplacement[i % numberReplacement.length] || numbers[i];
    }

    Object.assign(charMap, numberMap);

    const otherReplacement = randomizeString(selectedScheme["用字"] || "");
    const usedChars = Array.from(new Set(inputText.split(""))).filter(
        (char) => !不要的字符.includes(char) && !charMap[char]
    );

    usedChars.forEach((char, index) => {
        charMap[char] =
            otherReplacement[index % otherReplacement.length] || char;
    });

    Array.from(inputText).forEach((char) => {
        output += charMap[char] ? charMap[char] : char;
    });

    document.getElementById("output").innerText = output;
}

function 映射書文顯示用字() {
    const inputText = document.getElementById("inputText").value;
    const charSet = Array.from(
        new Set(
            inputText
                .split("")
                .filter(
                    (char) =>
                        !(
                            不要的字符 +
                            數字 +
                            字母大寫 +
                            字母小寫 +
                            字母大寫全角 +
                            字母小寫全角
                        ).includes(char)
                )
        )
    );

    try {
        document.getElementById("charSetOutput").innerText = charSet.join("");

        const charSetOutputCount =
            document.getElementById("charSetOutputCount");
        if (inputText) {
            charSetOutputCount.innerText =
                "計數：" + String(charSet.join("").length);
        } else if (charSetOutputCount) {
            charSetOutputCount.innerText = "";
        }
    } catch (err) {}
}

function 映射書文應用() {
    映射書文();
    映射書文顯示用字();
    更新地址欄參數();
}

function 映射書文複製輸出() {
    const elementOutput = document.querySelector("#output");
    if (!elementOutput) {
        映射書文();
    }
    if (elementOutput.innerText == "") {
        return;
    }
    navigator.clipboard.writeText(elementOutput.innerText);
}

function 映射書文複製用字() {
    const charSetOutput = document.querySelector("#charSetOutput");
    if (!charSetOutput) {
        映射書文顯示用字();
    }
    if (!charSetOutput.innerText == "") {
        return;
    }
    navigator.clipboard.writeText(charSetOutput.innerText);
}

function 加載查詢參數() {
    const queryParams = new URLSearchParams(window.location.search);
    const inputText = queryParams.get("inputText");
    const seed = queryParams.get("seed");
    const scheme = queryParams.get("scheme");
    const seedChanged = queryParams.get("seedChanged");

    if (inputText) {
        document.getElementById("inputText").value =
            decodeURIComponent(inputText);
        用戶改變了seed了嗎 = seedChanged === "true";
    }
    if (seed) {
        const seedInput = document.getElementById("seed");
        const 隨機值 = document.querySelector(`body > label[name="隨機值"]`);
        (seedChanged == "true" ? seedInput : 隨機值).value =
            decodeURIComponent(seed);
        // seedInput.dataset.userSet = "true";
    }
    if (scheme) {
        const schemeSelector = document.getElementById("schemeSelector");
        schemeSelector.value = decodeURIComponent(scheme);
    }

    映射書文();
}

function 更新地址欄參數() {
    const inputText = encodeURIComponent(
        document.getElementById("inputText").value
    );
    var seed = document.getElementById("seed").value;
    if (!seed) {
        seed = document.querySelector(`body > label[name="隨機值"]`).innerText;
    }
    seed = encodeURIComponent(seed);
    const scheme = encodeURIComponent(
        document.getElementById("schemeSelector").value
    );
    const seedChanged = 用戶改變了seed了嗎 ? "true" : "false";

    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set("inputText", inputText);
    queryParams.set("seed", seed);
    queryParams.set("scheme", scheme);
    queryParams.set("seedChanged", seedChanged);
    history.pushState(null, "", "?" + queryParams.toString());
}

function 映射書文複製當䈎() {
    navigator.clipboard.writeText(window.location.href);
}

document.addEventListener("DOMContentLoaded", () => {
    const elementOutput = document.querySelector("#inputText");
    elementOutput.addEventListener("input", () => {
        映射書文應用();
    });
    const select = document.querySelector("#schemeSelector");
    select.addEventListener("change", () => {
        映射書文應用();
    });
    const seedInput = document.querySelector("#seed");
    seedInput.addEventListener("input", () => {
        const 隨機值 = document.querySelector(`body > label[name="隨機值"]`);
        if (seedInput.value) {
            隨機值.innerText = "";
        }
        映射書文應用();
    });

    加載查詢參數();
    document.getElementById("seed").addEventListener("input", 更新地址欄參數);
    document
        .getElementById("schemeSelector")
        .addEventListener("change", 更新地址欄參數);

    document.getElementById("seed").addEventListener("input", () => {
        用戶改變了seed了嗎 = true;
        更新地址欄參數();
        映射書文應用();
    });
});
