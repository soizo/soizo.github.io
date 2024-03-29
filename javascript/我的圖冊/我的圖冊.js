(async () => {
    const 原始文件 = await 抓取文件("./json/公共/圖象索引.json");
    var 最終 = 処理(原始文件);
    var 全部圖片 = document.getElementById("全部圖片");
    全部圖片.innerHTML = 最終;
    設置按鈕事件監聽器();
})();

async function 抓取文件(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("网絡爛 爆 了！也可能是路徑！");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("文件讀取失敗：", error);
        return null;
    }
}

function 処理(文件) {
    const 平面文件 = window.展開嵌套結構(文件);

    return Object.entries(平面文件)
        .map(([鍵, 值]) => {
            return `
			<button class="圖片按鈕" onclick='複製並加入彈幕("${值}", "${鍵}")' tabindex="0">
				<img src='${值}' alt='${鍵}' draggable="false" class="unselectable"></img>
			</button>
			  `;
        })
        .join("");
}
