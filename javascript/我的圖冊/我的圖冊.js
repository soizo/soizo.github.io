(async () => {
  const 原始文件 = await 抓取文件("./assets/我的圖冊.json");
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
  const 文件keys = Object.keys(文件);
  const 文件values = Object.values(文件);
  let 修改後 = 文件keys.map(function (value, i, array) {
    let vkey = value;
    let vvalue = 文件values[i];
    return `<button class="圖片按鈕" onclick='複製並加入彈幕("${vvalue}", "${vkey}")' tabindex="0">
              <img src='${vvalue}' alt='${vkey}'></img>
            </button>`;
  });
  return 修改後.join("");
}
