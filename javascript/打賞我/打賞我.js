var 當前語言 = "漢文";

const 語言配置 = {
    漢文: {
        語言: "語言",
        打賞我: "打賞我！",
        標題: "請給我打賞",
        解釋: "无緣由地給我打賞，我就可以賣點零食",
    },
    汉文: {
        語言: "语言",
        打賞我: "打赏我！",
        標題: "请给我打赏",
        解釋: "无缘由地给我打赏，我就可以卖点零食",
    },
    日本文: {
        語言: "言語",
        打賞我: "チップをお願い！",
        標題: `チ<span class="小">ッ</span>プをお願いね`,
        解釋: `理由なしにチ<span class="小">ッ</span>プをくれたら、お菓子を買えます`,
    },
    國漢文混用: {
        語言: "언어",
        打賞我: "저에게 tip 주세요！",
        標題: "팁　좀　주시겠어요？",
        解釋: `<ruby>理由<rt>리유</rt></ruby>　없이　나에게　팁을　주면，\n<ruby>間食<rt>간식</rt></ruby>을　살　수　있어요`,
    },
    "🎨🪧": {
        語言: "🗣️",
        標題: "🥺👐💵",
        打賞我: "🥺👐💵",
        解釋: "🥺，🧐❌，👐💵😊⭕，🍨😍",
        meta: { 字體屬性: "SYSTEM" },
    },
};

function 切換語言() {
    const 語言配置Keys = Object.keys(語言配置);
    const 當前語言Index = 語言配置Keys.indexOf(當前語言);
    if (語言配置[當前語言] && 語言配置Keys[當前語言Index + 1]) {
        當前語言 = 語言配置Keys[當前語言Index + 1];
    } else {
        當前語言 = "漢文";
    }
    刷新直書介紹(當前語言, 語言配置);
}

function 刷新直書介紹(當前語言, 語言配置) {
    const 直書介紹 = document.getElementById("直書介紹");
    const 直書語言切換 = document.getElementById("直書語言切換");
    const 採用 = 語言配置[當前語言];
    if (採用) {
        var 示 = `<h1>${採用.標題}</h1>` + `<p>${採用.解釋}</p>`;
        直書介紹.innerHTML = 示;
        直書語言切換.innerText = 採用.語言;
        document.title = 採用.打賞我;
        if (採用.meta && 採用.meta.字體屬性) {
            const 字體 = (() => {
                switch (採用.meta.字體屬性) {
                    case "SYSTEM":
                        return "system-ui";
                }
            })();
            直書介紹.style.fontFamily = 字體;
            直書介紹.childNodes.forEach((node) => {
                node.style.fontFamily = 字體;
            });
            直書語言切換.style.fontFamily = 字體;
            直書語言切換.childNodes.forEach((node) => {
                if (node.nodeType === 1) {
                    node.style.fontFamily = 字體;
                }
            });
        } else {
            try {
                直書介紹.style.removeProperty("font-family");
                直書介紹.childNodes.forEach((node) => {
                    node.style.removeProperty("font-family");
                });
                直書語言切換.style.removeProperty("font-family");
                直書語言切換.childNodes.forEach((node) => {
                    node.style.removeProperty("font-family");
                });
            } catch (error) {}
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    刷新直書介紹(當前語言, 語言配置);
    console.log(
        window.getComputedStyle(
            document.querySelector("#二維碼>img"),
            "::before"
        )
    );
});

const 二維碼 = {
    微信支付: document.querySelector(`#二維碼 > img[二維碼="微信支付"]`),
    支付寶: document.querySelector(`#二維碼 > img[二維碼="支付寶"]`),
};

function 打開鏈接(link) {
    if (link) {
        window.open(link, "_blank");
    }
}
