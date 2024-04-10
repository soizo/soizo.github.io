const params = new URLSearchParams(window.location.search);
const title = params.get("title");

function replaceRubyFormat(input) {
    const reg括號 = /(.+?)（([^：（）]+)：([^：（）]+)）/g;
    return input.replace(reg括號, (match, prefix, BB, CCC) => {
        const startPos = prefix.length - BB.length;
        const AA = prefix.substring(startPos);
        if (AA === BB) {
            return (
                `${prefix.substring(
                    0,
                    startPos
                )}<ruby>${AA}<rt>${CCC}</rt></ruby>` || ""
            );
        } else {
            return match || "";
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
    return output || "";
}

function showError(message) {
    const errorMessage = document.createElement("div");
    errorMessage.id = "錯誤介面";
    errorMessage.innerHTML = `
    <h1 class="unselectable">抱歉︕</h1>
    <p class="unselectable">出錯了︐可能是䈎面不存在︰</p>
    <p>${message}</p>
    `;
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(errorMessage);
}

function 网䈎圖標代替(markdownURL) {
    fetch(markdownURL)
        .then((response) => response.text())
        .then((markdownContent) => {
            const regex = /^\<\!\-{2,} ICON:\"(.+)\" \-{2,}\>$/m;
            let match = regex.exec(markdownContent);

            if (match) {
                const iconURL = match[1];
                let linkIcon = document.querySelector('link[rel="icon"]');
                if (!linkIcon) {
                    linkIcon = document.createElement("link");
                    linkIcon.rel = "icon";
                    document.head.appendChild(linkIcon);
                }
                linkIcon.href = iconURL;
            }
        })
        .catch((error) => {
            console.error("网䈎圖標代替失敗：", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    window.addMobileWarning();
    function 加載Showdown配置(filePath) {
        return fetch(filePath)
            .then((response) => response.json())
            .catch((error) => console.error("加載配置文件失敗:", error));
    }

    function markdownToHTML(markdown, 配置) {
        var converter = new showdown.Converter(配置);
        var html = converter.makeHtml(markdown);
        return html;
    }

    function MD替換(html) {
        document.getElementById("content").innerHTML =
            `<div id="MD外部"><div id="MD內部">` + html + `</div></div>`;
        window.全HTML私用字替換();
        window.全HTML絵文字替換();
        window.全HTML豎排符號替換();
    }

    if (title) {
        fetch(`/wiki/${title}.md`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("䈎面不存在");
                }
                return response.text();
            })
            .then((markdown) => {
                网䈎圖標代替(`/wiki/${title}.md`);

                const configPath = "/json/showdown/showdownConfig.json";
                加載Showdown配置(configPath).then((配置) => {
                    var 修改markdown = markdown;
                    修改markdown = 修改markdown.replace(
                        /『-(.*?)-』/g,
                        (match, p1) => `<u>${p1}</u>`
                    );
                    修改markdown = replaceRubyFormat(修改markdown);
                    修改markdown = 修改markdown.replace(/(?<!\\)\\spc/g, "　");
                    修改markdown = 全角替換(修改markdown);
                    const html = markdownToHTML(修改markdown, 配置);

                    MD替換(html);
                });

                document.title = `${title} - ${document.title}`;
            })
            .catch((error) => {
                showError(title);
            });
    } else {
        fetch(`/json/wiki/wiki目錄.json`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((wiki目錄) => {
                function generateTable(data) {
                    let htmlContent = "";

                    // 遍歷第一層：大分類
                    Object.keys(data).forEach((category) => {
                        // 每個分類與其表格用一個 <div> 包圍
                        htmlContent += `<div class="單Table">`;
                        // 為每個大分類添加 <h2> 標題
                        htmlContent += `<h2>${category}</h2>`;

                        // 提取當前分類下的表格數據
                        let tableData = data[category];
                        let headerRow = `<tr>${Object.keys(tableData)
                            .map((subCategory) => `<th>${subCategory}</th>`)
                            .join("")}</tr>`;
                        let rows = [];

                        // 獲取最大項目數來確保行的一致性
                        let maxItems = Math.max(
                            ...Object.values(tableData).map(
                                (subCategoryData) =>
                                    Object.keys(subCategoryData).length
                            )
                        );

                        for (let i = 0; i < maxItems; i++) {
                            let row = `<tr>${Object.keys(tableData)
                                .map((subCategory) => {
                                    let itemKeys = Object.keys(
                                        tableData[subCategory]
                                    );
                                    let itemKey = itemKeys[i];
                                    let itemValue =
                                        tableData[subCategory][itemKey];
                                    return `<td>${
                                        itemKey
                                            ? `<a href='?title=${itemKey}'>${itemValue}</a>`
                                            : ""
                                    }</td>`;
                                })
                                .join("")}</tr>`;
                            rows.push(row);
                        }

                        // 將生成的表格加入到 htmlContent 中
                        htmlContent += `<table>${headerRow}${rows.join(
                            ""
                        )}</table>`;
                        // 每個分類的 <div> 結束
                        htmlContent += `</div>`;
                    });
                    return htmlContent;
                }

                document.getElementById("content").innerHTML = `
					<div id="䈎彙外">
						<div id="䈎彙">
							<h2>全部　ＷＩＫＩ</h2>
							<div id="众Table">
								${generateTable(wiki目錄)}
							</div>
						</div>
					</div>`;
                window.全HTML絵文字替換();
                window.全HTML豎排符號替換();
            });
    }
});
