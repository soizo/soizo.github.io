document.addEventListener("DOMContentLoaded", function () {
    const windows = document.querySelectorAll(
        'div.S98Style.S98StyleCanDrag[S98Type="window"]'
    );

    windows.forEach(function (win) {
        const titleBar = win.querySelector(
            'div.S98Style.S98StyleCanDrag[S98Type="window"] .title-bar'
        );

        let active = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        titleBar.addEventListener("mousedown", function (e) {
            active = true;
            initialX = e.clientX - win.getBoundingClientRect().right;
            initialY = e.clientY - win.offsetTop;
        });

        document.addEventListener("mouseup", function () {
            active = false;
        });

        document.addEventListener("mousemove", function (e) {
            if (active) {
                e.preventDefault();

                // 計算新的位置
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                // 考慮頁面捲動影響
                const scrollX = window.scrollX;
                const scrollY = window.scrollY;

                currentX += scrollX;
                currentY += scrollY;

                // 獲取視窗的寬度和高度
                const windowWidth = document.documentElement.clientWidth;
                const windowHeight = document.documentElement.clientHeight;

                // 獲取可移動窗口的尺寸
                const winWidth = win.offsetWidth;
                const winHeight = win.offsetHeight;

                // 確保窗口不會移出屏幕的上邊界
                currentY = Math.max(0, currentY);

                // 確保窗口不會移出屏幕的下邊界
                currentY = Math.min(windowHeight - winHeight, currentY);

                currentX = Math.max(scrollX + winWidth, currentX);

                // 確保窗口不會移出屏幕的下邊界
                currentX = Math.min(windowWidth, currentX);

                // 計算從右邊界開始的偏移量
                const right = Math.max(0, windowWidth - currentX + 0);
                win.style.right = right + "px";
                win.style.top = currentY + "px";
            }
        });
    });
});
