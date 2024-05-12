// 低畫質開關 = false;

const 語音 = [
    "/它專/栗炭千唯/音頻/語音/古文有使.wav",
    "/它專/栗炭千唯/音頻/語音/吃.wav",
    "/它專/栗炭千唯/音頻/語音/各個爲我烏首.wav",
    "/它專/栗炭千唯/音頻/語音/好也吾為嘔吾合喔匝匝惡厄我扎俄𠵩嘆.wav",
    "/它專/栗炭千唯/音頻/語音/初憶.wav",
    "/它專/栗炭千唯/音頻/語音/威武得十惡嗄愛有一事.wav",
    "/它專/栗炭千唯/音頻/語音/是ㄟ長觸手了呃啊.wav",
    "/它專/栗炭千唯/音頻/語音/救我.wav",
    "/它專/栗炭千唯/音頻/語音/嘟嘟的讀嘟嘟的都督.wav",
    "/它專/栗炭千唯/音頻/語音/shoot.wav",
];

const 音效 = {
    ドアノブをひねる4: "/它專/栗炭千唯/音頻/音效/ドアノブをひねる4.wav",
};

低畫質Config = {
    quality: "random",
    quality_random_min: 5,
    quality_random_max: 10,
    quality_random_divide: 100,
    delay: 3,
};

const 語音Objects = 語音.map((src) => {
    const audio = new Audio(src);
    // 監聽音頻播放結束事件
    audio.onended = () => {
        document.getElementById("提示文本").style.display = "none";
    };
    return audio;
});

document.addEventListener("DOMContentLoaded", () => {
    const 栗炭千唯黑瘦鬼 = document.getElementById("栗炭千唯黑瘦鬼");
    const 背景文字 = document.getElementById("背景文字");
    const 提示文本 = document.getElementById("提示文本");
    栗炭千唯黑瘦鬼.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * 語音Objects.length);
        const selectedAudio = 語音Objects[randomIndex];
        提示文本.innerText = "糺咅楽，诔㐔泶"; // 更新狀態文本
        提示文本.style.display = "block"; // 顯示狀態元素
        selectedAudio.play();
    });
    背景文字.addEventListener("click", () => {
        const text = 背景文字.innerText;
        navigator.clipboard
            .writeText(text)
            .then(() => {
                new Audio(音效["ドアノブをひねる4"]).play();
                提示文本.innerText = "义夲邔禝裚"; // 更新狀態文本
                提示文本.style.display = "block"; // 顯示狀態元素
                setTimeout(() => {
                    提示文本.style.display = "none"; // 5秒後隱藏狀態元素
                }, 2000);
            })
            .catch((err) => {
                console.error("禝裚錯誤", err);
            });
    });
});
