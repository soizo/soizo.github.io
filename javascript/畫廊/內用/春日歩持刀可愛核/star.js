//我从 https://github.com/q-mona/web-star-background 拿的

// 全局配置
let starConfig = {};

// 获得canvas元素
let canvasStar = document.querySelector(
    '#展示>.展示項目[識別符="春日歩持刀可愛核"]>canvas.star'
);
let ctxStar = canvasStar.getContext("2d");

// 星星的图片
let star_img = "";

// 月亮的图片'
let moon_img = "";

let starPockets = []; // 用于保存星星、月亮属性
let starTimer = null; // 防抖
let starIdx1, starIdx2; // 保存requestAnimationFrame的id

// 设置图片
const starSetImg = (star, moon) => {
    star_img = star;
    moon_img = moon;
};

// 初始化canvas
const starInitCanvas = (starCfg) => {
    starConfig = starCfg;
    canvasStar.width = starConfig.canvas.width;
    canvasStar.height = starConfig.canvas.height;
    ctxStar.globalAlpha = starConfig.canvas.globalAlpha;
    starPockets = [];
};

// 初始化pockets数组
const starInitPocket = (temp_type) => {
    for (let i = 0; i < starConfig[temp_type].num; i++) {
        const x = Math.random() * starConfig.canvas.x;
        const y = Math.random() * starConfig.canvas.y;
        let size, rot, rot_step, step, hue;

        size =
            starConfig[temp_type].min_size +
            Math.random() *
                (starConfig[temp_type].max_size -
                    starConfig[temp_type].min_size);
        rot = starConfig[temp_type].rot * Math.random();
        rot_step = starConfig[temp_type].rot_step;
        step =
            starConfig[temp_type].min_step +
            Math.random() *
                (starConfig[temp_type].max_step -
                    starConfig[temp_type].min_step);
        hue = Math.random() * 360; // 為每個星星分配一個隨機但固定的色度值

        starPockets.push({
            type: temp_type,
            x: x,
            y: y,
            size: size,
            rot: rot,
            rot_step: rot_step,
            step: step,
            hue: hue, // 儲存色度值
        });
    }
};

// 动画绘制
const starAnimation = () => {
    ctxStar.clearRect(0, 0, starConfig.canvas.width, starConfig.canvas.height);

    for (const pocket of starPockets) {
        ctxStar.beginPath();
        ctxStar.save();
        ctxStar.translate(
            pocket.x + pocket.size / 2,
            pocket.y + pocket.size / 2
        );
        ctxStar.rotate((pocket.rot * Math.PI) / 180);

        pocket.rot += pocket.rot_step;
        if (pocket.rot >= 360) {
            pocket.rot = 0;
        }

        if (starConfig.canvas.direction == "down") pocket.y += pocket.step;
        else if (starConfig.canvas.direction == "up") pocket.y -= pocket.step;
        else if (starConfig.canvas.direction == "left") pocket.x -= pocket.step;
        else if (starConfig.canvas.direction == "right")
            pocket.x += pocket.step;

        if (
            pocket.x < -pocket.size ||
            pocket.x > starConfig.canvas.width + pocket.size ||
            pocket.y > starConfig.canvas.height + pocket.size ||
            pocket.y < -pocket.size
        ) {
            pocket.x = Math.random() * starConfig.canvas.x;
            pocket.y = Math.random() * starConfig.canvas.y;
        }

        ctxStar.translate(
            -(pocket.x + pocket.size / 2),
            -(pocket.y + pocket.size / 2)
        );
        const img = pocket.type == "star" ? star_img : moon_img;
        ctxStar.filter = `hue-rotate(${pocket.hue}deg)`; // 使用預先分配的色度值
        ctxStar.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            pocket.x,
            pocket.y,
            pocket.size,
            pocket.size
        );
        ctxStar.restore();
    }
};

// 动画执行
const starRunAnimation = () => {
    let begin_time = new Date().getTime();
    const update = () => {
        starIdx1 = requestAnimationFrame(update);

        let cur_time = new Date().getTime();
        if (cur_time - begin_time >= starConfig.canvas.interval) {
            starAnimation(ctxStar, starPockets);
            begin_time = cur_time;
        }
    };
    starIdx2 = requestAnimationFrame(update);
};

// 监听窗口变化
window.onresize = () => {
    clearTimeout(starTimer);
    starTimer = setTimeout(() => {
        cancelAnimationFrame(starIdx1);
        // console.log(window.innerWidth);
        starConfig.canvas.width = window.innerWidth;
        starConfig.canvas.height = window.innerHeight;
        starInitCanvas(starConfig); // 初始化畫布設置
        starInitPocket("star"); // 初始化星星數據
        starRunAnimation(); // 啟動新的動畫
    }, 0);
};

const starObserver = new MutationObserver(() => {
    canvasContainer = document.querySelector(
        '#展示>.展示項目[識別符="春日歩持刀可愛核"]'
    );
    canvasStar = canvasContainer
        ? canvasContainer.querySelector("canvas.star")
        : null;
    if (canvasStar) {
        const ctx = canvasStar.getContext("2d");
        ctxStar = ctx ? ctx : null;
        if (ctxStar) {
            cancelAnimationFrame(starIdx1); // 取消之前的動畫
            cancelAnimationFrame(starIdx2); // 取消之前的動畫
            starInitCanvas(starConfig); // 初始化畫布設置
            starInitPocket("star"); // 初始化星星數據
            starRunAnimation(); // 啟動新的動畫
        }
    } else {
        cancelAnimationFrame(starIdx1);
        cancelAnimationFrame(starIdx2);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    starObserver.observe(document.body, { childList: true, subtree: true });
});
