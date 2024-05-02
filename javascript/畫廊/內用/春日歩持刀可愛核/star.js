//我从 https://github.com/q-mona/web-star-background 拿的

// 全局配置
let config = {};

// 获得canvas元素
let canvasStar = document.querySelector(
    '#展示>.展示項目[識別符="春日歩持刀可愛核"]>canvas.star'
);
const ctxStar = canvasStar.getContext("2d");

// 星星的图片
let star_img = "";

// 月亮的图片'
let moon_img = "";

let pockets = []; // 用于保存星星、月亮属性
let timer = null; // 防抖
let idx1, idx2; // 保存requestAnimationFrame的id

// 设置图片
const setImg = (star, moon) => {
    star_img = star;
    moon_img = moon;
};

// 初始化canvas
const initCanvas = (cfg) => {
    config = cfg;
    canvasStar.width = config.canvas.width;
    canvasStar.height = config.canvas.height;
    ctxStar.globalAlpha = config.canvas.globalAlpha;
    pockets = [];
};

// 初始化pockets数组
const initPocket = (temp_type) => {
    for (let i = 0; i < config[temp_type].num; i++) {
        const x = Math.random() * config.canvas.x;
        const y = Math.random() * config.canvas.y;
        let size, rot, rot_step, step, hue;

        size =
            config[temp_type].min_size +
            Math.random() *
                (config[temp_type].max_size - config[temp_type].min_size);
        rot = config[temp_type].rot * Math.random();
        rot_step = config[temp_type].rot_step;
        step =
            config[temp_type].min_step +
            Math.random() *
                (config[temp_type].max_step - config[temp_type].min_step);
        hue = Math.random() * 360; // 為每個星星分配一個隨機但固定的色度值

        pockets.push({
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
    ctxStar.clearRect(0, 0, config.canvas.width, config.canvas.height);

    for (const pocket of pockets) {
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

        if (config.canvas.direction == "down") pocket.y += pocket.step;
        else if (config.canvas.direction == "up") pocket.y -= pocket.step;
        else if (config.canvas.direction == "left") pocket.x -= pocket.step;
        else if (config.canvas.direction == "right") pocket.x += pocket.step;

        if (
            pocket.x < -pocket.size ||
            pocket.x > config.canvas.width + pocket.size ||
            pocket.y > config.canvas.height + pocket.size ||
            pocket.y < -pocket.size
        ) {
            pocket.x = Math.random() * config.canvas.x;
            pocket.y = Math.random() * config.canvas.y;
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
const runAnimation = () => {
    let begin_time = new Date().getTime();
    const update = () => {
        idx1 = requestAnimationFrame(update);

        let cur_time = new Date().getTime();
        if (cur_time - begin_time >= config.canvas.interval) {
            starAnimation(ctxStar, pockets);
            begin_time = cur_time;
        }
    };
    idx2 = requestAnimationFrame(update);
};

// 监听窗口变化
window.onresize = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        cancelAnimationFrame(idx1);
        console.log(window.innerWidth);
        config.canvas.width = window.innerWidth;
        config.canvas.height = window.innerHeight;

        initCanvas(config);
        initPocket("star");
        runAnimation();
    }, 0);
};
