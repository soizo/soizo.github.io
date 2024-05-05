const ずんだもん = document.getElementById("ずんだもん");
ずんだもん.style.pointerEvents = "none";
ずんだもん.classList.add("unselectable");
ずんだもん.classList.add("undraggable");

const ずんだもん本體 = document.createElement("div");
ずんだもん本體.setAttribute("data-備註", "ずんだもん本體");

ずんだもん本體.style.display = "flex";
ずんだもん本體.style.position = "absolute"; // 改為相對定位
ずんだもん本體.style.left = "0"; // 保持原值，這裡0已是相對於父元素
ずんだもん本體.style.bottom = "0"; // 改為正值表示向上偏移20px
ずんだもん本體.style.height = "100%";
ずんだもん本體.style.width = "100%";
ずんだもん本體.style.pointerEvents = "none";

const svgCollisionBox = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
);
svgCollisionBox.setAttribute("width", "61%");
svgCollisionBox.setAttribute("height", "60%");
svgCollisionBox.style.position = "absolute"; // 改為相對定位
svgCollisionBox.style.left = "16%"; // 保持原值，表示向右偏移35px
svgCollisionBox.style.top = "28%"; // 保持原值，表示向下偏移60px
svgCollisionBox.style.pointerEvents = "none";

const rectElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
);
rectElement.setAttribute("width", "100%");
rectElement.setAttribute("height", "100%");
rectElement.setAttribute("x", "0");
rectElement.setAttribute("y", "0");
rectElement.setAttribute("fill", "transparent");
rectElement.style.cursor = "pointer";
rectElement.style.pointerEvents = "auto";

svgCollisionBox.appendChild(rectElement);

ずんだもん本體.appendChild(svgCollisionBox);

const imagesDics = {
    摸摸: {
        摸摸: "/assets/萌寵/ずんだもん/圖象/摸摸.gif",
    },
    招呼: {
        高興: "/assets/萌寵/ずんだもん/圖象/高興.png",
        高興_半閉眼: "/assets/萌寵/ずんだもん/圖象/高興_半閉眼.png",
        高興_腕下: "/assets/萌寵/ずんだもん/圖象/高興_腕下.png",
        開心: "/assets/萌寵/ずんだもん/圖象/開心.png",
        害羞: "/assets/萌寵/ずんだもん/圖象/害羞.png",
        害羞_折耳: "/assets/萌寵/ずんだもん/圖象/害羞_折耳.png",
    },
    常態: {
        常態: "/assets/萌寵/ずんだもん/圖象/常態.png",
        常態_張嘴: "/assets/萌寵/ずんだもん/圖象/常態_張嘴.png",
    },
};

const audioDics = {
    招呼: {
        俊達語: {
            ナノダ_興奮: "/assets/萌寵/ずんだもん/音頻/ナノダ！.wav",
            ナノダ: "/assets/萌寵/ずんだもん/音頻/ナノダ.wav",
            ノダー: "/assets/萌寵/ずんだもん/音頻/ノダー.wav",
            ノーダ: "/assets/萌寵/ずんだもん/音頻/ノーダ.wav",
        },
        人類語: {
            ニーハウ: "/assets/萌寵/ずんだもん/音頻/ニーハウ.wav",
            ハーロウ: "/assets/萌寵/ずんだもん/音頻/ハーロウ.wav",
            スインチャウ: "/assets/萌寵/ずんだもん/音頻/スインチャウ.wav",
            アンニョンハセヨー:
                "/assets/萌寵/ずんだもん/音頻/アンニョンハセヨー.wav",
            ナマステー: "/assets/萌寵/ずんだもん/音頻/ナマステー.wav",
            セラーマト: "/assets/萌寵/ずんだもん/音頻/セラーマト.wav",
            ハイサイ: "/assets/萌寵/ずんだもん/音頻/ハイサイ！.wav",
            プリービェッイック:
                "/assets/萌寵/ずんだもん/音頻/プリービェッイック.wav",
        },
    },
    摸摸: {
        フッ_1: "/assets/萌寵/ずんだもん/音頻/フッ_1.wav",
        フッ_2: "/assets/萌寵/ずんだもん/音頻/フッ_2.wav",
        フッ_3: "/assets/萌寵/ずんだもん/音頻/フッ_3.wav",
        ホッ: "/assets/萌寵/ずんだもん/音頻/ホッ.wav",
    },
    大好き: "/assets/萌寵/ずんだもん/音頻/大好き！.wav",
};

const 其餘Dics = {
    爆炸圖: "/assets/圖象/いらすとや/ずんだ餅を含む爆発.png",
    爆炸聲: "/assets/音頻/音效/爆発.wav",
};

var imageElement = document.createElement("img");
imageElement.setAttribute("data-備註", "ずんだもんimageElement");

imageElement.src = imagesDics["常態"]["常態"];

ずんだもん.appendChild(ずんだもん本體);
ずんだもん本體.appendChild(imageElement);

///                                                                     ///
///                                  狀態                                 ///
///                                                                     ///

var 今狀態 = false;

function 狀態(狀態) {
    今狀態 = 狀態;
}

///                                                                     ///
///                                 動作函數                                ///
///                                                                     ///

function 不摸摸了() {
    狀態("常態_張嘴");
    imageElement.src = imagesDics["常態"]["常態_張嘴"];
    rectElement.style.cursor = "pointer";
    動作邪 = false;
}

///                                                                     ///
///                                  動作                                 ///
///                                                                     ///

var 動作邪 = false;
let 長按Timeout = null;
const 長按時間 = 500;

rectElement.addEventListener("mouseenter", function () {
    if (!動作邪 && rectElement.style.cursor === "pointer") {
        狀態("常態_張嘴");
        imageElement.src = imagesDics["常態"]["常態_張嘴"];
    }
});

rectElement.addEventListener("mouseout", function () {
    if (!動作邪) {
        狀態("常態");
        imageElement.src = imagesDics["常態"]["常態"];
    }
});

let isMouseDownOnImageElement = false;
let MouseDownOnImageElementTime = false;

rectElement.addEventListener("mousedown", function (event) {
    if (!動作邪 && event.button === 0) {
        動作邪 = true;
        isMouseDownOnImageElement = true;
        MouseDownOnImageElementTime = new Date();
        長按Timeout = setTimeout(function () {
            狀態("摸摸");
            imageElement.src = Obj中的隨機項(imagesDics["摸摸"]);
            rectElement.style.cursor = "none";
            動作邪 = true;
            let 摸摸Interval = setInterval(function () {
                if (今狀態 == "摸摸") {
                    隨機資產生產("摸摸", audioDics).play();
                } else {
                    clearInterval(摸摸Interval);
                }
            }, 長按時間);
        }, 長按時間);
    }
});

rectElement.addEventListener("mouseup", function () {
    if (isMouseDownOnImageElement) {
        clearTimeout(長按Timeout);
        if (今狀態 == "摸摸") {
            不摸摸了();
        } else {
            setTimeout(function () {
                狀態("常態_張嘴");
                imageElement.src = imagesDics["常態"]["常態_張嘴"];
                動作邪 = false;
                MouseDownOnImageElementTime = false;
                // }, 0);
            }, 長按時間);
            isMouseDownOnImageElement = false;
        }
    }
});

rectElement.addEventListener("mouseup", function () {
    if (MouseDownOnImageElementTime) {
        if (new Date() - MouseDownOnImageElementTime <= 500) {
            if (Math.floor((Math.random() * 100) % 2)) {
                隨機資產生產("俊達語", audioDics["招呼"]).play();
            } else {
                隨機資產生產("人類語", audioDics["招呼"]).play();
            }
            imageElement.src = Obj中的隨機項(imagesDics["招呼"]);
        }
    }
});

document.addEventListener("mouseup", function () {
    // console.log(isMouseDownOnImageElement);
});

rectElement.addEventListener("mouseleave", function (event) {
    clearTimeout(長按Timeout);
    if (今狀態 == "摸摸") {
        不摸摸了();
    }
});

let 連續點擊_clickCount = 0;
let 連續點擊_startTime = 0;

const 連續點擊最少次數 = 23;
const 連續點擊持續時間 = 5000;

rectElement.addEventListener("click", function () {
    const now = Date.now();

    if (連續點擊_clickCount === 0) {
        連續點擊_startTime = now;
    }

    連續點擊_clickCount++;

    // 檢查點擊次數和時間條件
    if (
        連續點擊_clickCount >= 連續點擊最少次數 &&
        now - 連續點擊_startTime <= 連續點擊持續時間
    ) {
        爆爆爆爆爆爆炸炸炸炸炸炸();
        連續點擊_clickCount = 0;
        連續點擊_startTime = 0;
    } else if (now - 連續點擊_startTime > 連續點擊持續時間) {
        連續點擊_clickCount = 0;
        連續點擊_startTime = 0;
    }
});

///                                                                     ///
///                                  函數                                 ///
///                                                                     ///

function 隨機資產生產(類派, 資產) {
    const url = Obj中的隨機項(資產[類派]);
    return new Audio(url);
}

function Obj中的隨機項(Obj) {
    return Object.values(Obj)[
        Math.floor((Math.random() * 100) % Object.keys(Obj).length)
    ];
}

function 爆爆爆爆爆爆炸炸炸炸炸炸() {
    new Audio(其餘Dics["爆炸聲"]).play();
    const newImageElement = imageElement.cloneNode(true);
    imageElement.parentNode.replaceChild(newImageElement, imageElement);
    svgCollisionBox.parentNode.removeChild(svgCollisionBox);

    newImageElement.src = 其餘Dics["爆炸圖"];
    newImageElement.style.cursor = "auto";
    newImageElement.style.transition = "opacity 4s ease-in-out";
    ずんだもん本體.style.left = "-30px";
    if (Math.floor((Math.random() * 100) % 2)) {
        newImageElement.style.transform = "scaleX(-1)";
    }
    setTimeout(function () {
        newImageElement.style.opacity = 0;
    }, 100);
    setTimeout(function () {
        ずんだもん.parentNode.removeChild(ずんだもん);
    }, 4000);
}
