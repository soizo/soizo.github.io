document.addEventListener("DOMContentLoaded", function () {
  const 遮擋元素們 = document.querySelectorAll(".遮擋下");

  遮擋元素們.forEach((遮擋元素) => {
    遮擋元素.classList.remove("遮擋空");
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
  });

  document.addEventListener("selectionchange", function () {
    const selectedText = window.getSelection().toString();
    遮擋元素們.forEach((遮擋元素) => {
      const isTextSelectedWithin =
        selectedText &&
        (遮擋元素.textContent.includes(selectedText) ||
          selectedText.includes(遮擋元素.textContent));
      遮擋元素.classList.toggle("遮擋空", isTextSelectedWithin);
      遮擋元素.classList.toggle("遮擋有", !isTextSelectedWithin);
    });
  });
});
