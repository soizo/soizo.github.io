document.addEventListener("DOMContentLoaded", function () {
    if (
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
        navigator.userAgent.match(/AppleWebKit/)
    ) {
        document
            .querySelector('meta[name="viewport"]')
            .setAttribute(
                "content",
                "height=device-height, initial-scale=0.85"
            );
    }
    替換mySiteLink框("soizo.gif");
    document
        .getElementById("mySiteLink框")
        .addEventListener("click", function () {
            this.select();
        });
});

function 替換mySiteLink框(link) {
    const 替換mySiteLink框 = document.getElementById("mySiteLink框");
    替換mySiteLink框.value = `<a href="https://soizo.github.io/" target="_blank"> <img src="${
        `https://soizo.github.io/assets/圖象/貼紙/网站/` + link
    }"></a>`;
}
