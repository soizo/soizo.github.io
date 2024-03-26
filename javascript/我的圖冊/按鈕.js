function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      return 1;
    },
    function (err) {
      return 0;
    }
  );
}
function 複製並加入彈幕(text, alt) {
  navigator.clipboard.writeText(text).then(
    function () {
      createPopText(`已複製：\r\n${alt}`, "#00ff00", "#00000000");
    },
    function () {
      createPopText("複製失败", "#000", "#ff0000");
    }
  );
}

function createPopText(text, color, backgroundColor) {
  var textElement = document.createElement("div");
  textElement.classList.add("pop-text");
  textElement.classList.add("unselectable");
  textElement.textContent = text || "";
  document.body.appendChild(textElement);

  textElement.style.position = "fixed";
  textElement.style.maxWidth = "80%";
  textElement.style.maxHeight = "80%";
  textElement.style.whiteSpace = "pre-wrap";

  var randomX = Math.random() * 100;
  textElement.style.left = `${randomX}%`;
  textElement.style.transform = "translateX(-50%)";

  var elementHeight = textElement.offsetHeight;
  textElement.style.top = `-${elementHeight}px`;

  textElement.style.zIndex = 2147483647;
  textElement.style.color = color;
  textElement.style.backgroundColor = backgroundColor;

  textElement.style.pointerEvents = "none";

  textElement.classList.add("falling");

  textElement.addEventListener("animationend", function () {
    textElement.remove();
  });
}

function 設置按鈕事件監聽器() {
  document.querySelectorAll(".圖片按鈕").forEach((button) => {
    button.addEventListener("auxclick", function (e) {
      if (e.button === 1) {
        e.preventDefault();
        const link = this.querySelector("img").src;
        window.open(link, "_blank");
      }
    });
  });
}
