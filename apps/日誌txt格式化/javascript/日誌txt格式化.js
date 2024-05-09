document.addEventListener("DOMContentLoaded", () => {
    const elementOutput = document.querySelector("#inputText");
    elementOutput.addEventListener("input", () => {
        格式化應用();
    });
});

function 格式化應用() {
    // 獲取輸入文本
    const inputText = document.getElementById("inputText").value;

    // 預處理：尋找錯誤的 `/---/` 與日期行未正確分隔的情況，修正分隔
    const preProcessedText = inputText.replace(
        /(\/---\/)([A-Z]{3}\s+\d{4}\/\d{1,2}\/\d{1,2}(\/\d{1,2}\:\d{1,2})?)/g,
        "$1\n$2"
    );

    // 使用特定的分隔符来分割每一組，保留空行
    const groupPattern = /\n(?=\/---\/)/;
    const groups = preProcessedText.split(groupPattern);

    // 定義格式化後的組集合
    let formattedGroups = [];

    // 遍歷每一組
    groups.forEach((group) => {
        // 保留所有原始行，包括空行
        let lines = group.split("\n");

        // 安全地檢查和設置分隔符和日期行
        let separatorLine = lines.length > 0 ? lines[0].trim() : "";
        let dateLine = lines.length > 1 ? lines[1].trim() : "";

        // 正規化分隔符
        separatorLine = "/---/";

        // 格式化日期行
        const regexDate =
            /^([A-Z]{3})\s+(\d{4})\/(\d{1,2})\/(\d{1,2})(\/(\d{1,2})\:(\d{1,2}))?$/;
        const match = dateLine.match(regexDate);

        if (match) {
            const prefix = match[1];
            const year = match[2].padStart(4, "0");
            const month = match[3].padStart(2, "0");
            const day = match[4].padStart(2, "0");
            const hour = match[6] ? match[6].padStart(2, "0") : undefined;
            const minute = match[7] ? match[7].padStart(2, "0") : undefined;
            dateLine =
                `${prefix}\t${year}/${month}/${day}` +
                (hour && minute ? `/${hour}:${minute}` : "");
        } else {
            // 若無效，則留空
            dateLine = "";
        }

        // 移除末尾空行
        while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
            lines.pop();
        }

        // 收集格式化後的組，包括所有原始正文行，不包括末尾的空行
        if (dateLine) {
            formattedGroups.push(
                [separatorLine, dateLine, ...lines.slice(2)].join("\n")
            );
        }
    });

    // 合併組並添加一個空行分隔符
    const output = formattedGroups.join("\n\n");

    // 設置輸出結果
    document.getElementById("output").innerText = output;
}

function 格式化複製輸出() {
    const elementOutput = document.querySelector("#output");
    if (!elementOutput) {
        格式化應用();
    }
    if (elementOutput.innerText == "") {
        return;
    }
    navigator.clipboard.writeText(elementOutput.innerText);
}

function 複製今日道曆() {
    try {
        const textToCopy =
            window.轉換道曆(new Date(), 1, `/---/\nwww\tyyyy/mm/dd/`) +
            window.填充0(new Date().getHours(), 2) +
            ":" +
            window.填充0(new Date().getMinutes(), 2);
        navigator.clipboard.writeText(textToCopy);
    } catch (err) {}
}
