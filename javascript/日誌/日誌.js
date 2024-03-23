document.addEventListener("copy", function (e) {
  // 獲取用戶選擇的文本
  var 反向豎排符號 = {
    "︐": "，",
    "︒": "。",
    "︓": "：",
    "︔": "；",
    "︕": "！",
    "︖": "？",
    "︗": "〖",
    "︘": "〗",
    "︙": "…",
    "︰": "：",
    "︱": "—",
    "︲": "–",
    "︳": "_",
    "︴": "﹏",
    "︵": "（",
    "︶": "）",
    "︷": "｛",
    "︸": "｝",
    "︹": "〔",
    "︺": "〕",
    "︻": "【",
    "︼": "】",
    "︽": "《",
    "︾": "》",
    "︿": "〈",
    "﹀": "〉",
    "﹁": "「",
    "﹂": "」",
    "﹃": "『",
    "﹄": "』",
    "﹇": "［",
    "﹈": "］",
  };

  var selectedText = window.getSelection().toString();

  // 如果有選擇文本
  if (selectedText) {
    // 阻止默認的複製行為
    e.preventDefault();

    // 獲取剪貼板對象
    var clipboardData = e.clipboardData || window.clipboardData;

    // 設置自定義複製內容，這裡示例是在選擇的文本基礎上添加了一些自定義文字
    var customCopyText = replaceTextWithDictionary(selectedText, 反向豎排符號);

    // 設置剪貼板的數據
    clipboardData.setData("text/plain", customCopyText);

    // 顯示提示信息或進行其他操作
    // alert("自定義複製內容已經加入到剪貼板！");
  }
});
