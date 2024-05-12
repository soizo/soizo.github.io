document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(
        `#假电腦>[識別符="桌面圖標"]>[識別符="單桌面圖標"] a`
    );
    let clickTimeout;

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            clearTimeout(clickTimeout);
            this.parentNode.classList.add("向");
            // clickTimeout = setTimeout(() => {
            //     this.parentNode.classList.remove("clicked");
            // }, 400);
        });

        // 雙擊觸發跳轉
        link.addEventListener("dblclick", function (event) {
            clearTimeout(clickTimeout); // 清除單擊的setTimeout
            // this.parentNode.classList.remove("向");
            if (this.target === "_blank") {
                window.open(this.href, "_blank");
            } else {
                window.location = this.href;
            }
        });

        document.addEventListener("click", function (event) {
            if (!link.contains(event.target)) {
                link.parentNode.classList.remove("向");
                clearTimeout(clickTimeout);
            }
        });
    });
});
