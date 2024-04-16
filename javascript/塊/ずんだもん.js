const ずんだもん = document.getElementById("ずんだもん");
ずんだもん.classList.add("unselectable");
ずんだもん.classList.add("undraggable");

const ずんだもん本體 = document.createElement("div");
ずんだもん本體.setAttribute("data-備註", "ずんだもん本體");

ずんだもん本體.style.display = "flex";
ずんだもん本體.style.position = "fixed";
ずんだもん本體.style.left = 0;
ずんだもん本體.style.bottom = "-20px";
ずんだもん本體.style.height = "200px";
ずんだもん本體.style.cursor = "pointer";

console.log(ずんだもん);

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
    ずんだもん本體.style.cursor = "pointer";
    動作邪 = false;
}

///                                                                     ///
///                                  動作                                 ///
///                                                                     ///

var 動作邪 = false;
let 長按Timeout = null;

imageElement.addEventListener("mouseover", function () {
    if (!動作邪) {
        狀態("常態_張嘴");
        imageElement.src = imagesDics["常態"]["常態_張嘴"];
    }
});

imageElement.addEventListener("mouseout", function () {
    if (!動作邪) {
        狀態("常態");
        imageElement.src = imagesDics["常態"]["常態"];
    }
});

// imageElement.addEventListener("click", function () {
//     if (!動作邪) {
//     }
// });

imageElement.addEventListener("mousedown", function (event) {
    if (!動作邪) {
        imageElement.src = Obj中的隨機項(imagesDics["招呼"]);

        動作邪 = true;
        長按Timeout = setTimeout(function () {
            狀態("摸摸");
            imageElement.src = Obj中的隨機項(imagesDics["摸摸"]);
            ずんだもん本體.style.cursor = "none";
            動作邪 = true;
            let 摸摸Interval = setInterval(function () {
                if (今狀態 == "摸摸") {
                    隨機資產生產("摸摸", audioDics).play();
                } else {
                    clearInterval(摸摸Interval);
                }
            }, 500);
        }, 500);
    }
});

imageElement.addEventListener("mouseup", function () {
    clearTimeout(長按Timeout);
    if (今狀態 == "摸摸") {
        不摸摸了();
    } else {
        if (Math.floor((Math.random() * 100) % 2)) {
            隨機資產生產("俊達語", audioDics["招呼"]).play();
        } else {
            隨機資產生產("人類語", audioDics["招呼"]).play();
        }
        setTimeout(function () {
            狀態("常態_張嘴");
            imageElement.src = imagesDics["常態"]["常態_張嘴"];
            動作邪 = false;
        }, 500);
    }
});

imageElement.addEventListener("mouseleave", function (event) {
    clearTimeout(長按Timeout);
    if (今狀態 == "摸摸") {
        不摸摸了();
    }
});

let 連續點擊_clickCount = 0;
let 連續點擊_startTime = 0;

imageElement.addEventListener("click", function () {
    const now = Date.now();

    if (連續點擊_clickCount === 0) {
        連續點擊_startTime = now;
    }

    連續點擊_clickCount++;

    // 檢查點擊次數和時間條件
    if (連續點擊_clickCount >= 14 && now - 連續點擊_startTime <= 4000) {
        爆爆爆爆爆爆炸炸炸炸炸炸();
        連續點擊_clickCount = 0;
        連續點擊_startTime = 0;
    } else if (now - 連續點擊_startTime > 4000) {
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
    new Audio("/assets/音頻/音效/爆発.wav").play();
    const newImageElement = imageElement.cloneNode(true);
    imageElement.parentNode.replaceChild(newImageElement, imageElement);
    newImageElement.src = "/assets/圖象/いらすとや/爆発.png";
    newImageElement.style.cursor = "auto";
    newImageElement.style.transition = "opacity 4s ease-in-out";
    ずんだもん本體.style.left = "-30px";
    setTimeout(function () {
        newImageElement.style.opacity = 0;
    }, 100);
    setTimeout(function () {
        ずんだもん.parentNode.removeChild(ずんだもん);
    }, 4000);
}
