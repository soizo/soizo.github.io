const API_KEY = "e0e9854b15c2f71b37b26e29342509ba";
const USER_NAME = "SoizoKtantas";
let lastValidTrackUrl = null; // 用於存儲最後一次有效的音樂鏈接
// 函数：从 API 获取并更新音乐盒信息
let 有封面嗎 = false;
const 默認封面 = "/assets/圖象/UI/musicbox/defaultMusic.png";
const 歌曲封面素繒路徑 = "/json/musicbox/歌曲封面.json";
// 函数：从 JSON 获取封面
function fetchCoverFromJson(trackName, trackArtist) {
    return fetch(歌曲封面素繒路徑)
        .then((response) => response.json())
        .then((covers) => {
            console.log(trackName + "_" + trackArtist);
            const encodedTrackNameAndArtist =
                Array.from(new TextEncoder().encode(trackName))
                    .map((byte) => byte.toString(16).padStart(2, "0"))
                    .join("") +
                "_" +
                Array.from(new TextEncoder().encode(trackArtist))
                    .map((byte) => byte.toString(16).padStart(2, "0"))
                    .join("");
            console.log(encodedTrackNameAndArtist);
            return covers[encodedTrackNameAndArtist] || null;
        })
        .catch((error) => {
            console.error("讀取歌曲封面錯誤：", error);
            return null;
        });
}
let lastTrackInfo = {}; // 初始化為空對象

function updateMusicBox() {
    fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USER_NAME}&api_key=${API_KEY}&format=json&limit=1`
    )
        .then((response) => response.json())
        .then((data) => {
            const tracks = data.recenttracks.track;
            if (tracks && tracks.length > 0) {
                const track = tracks[0];
                const currentTrackUrl = track.url ? track.url : "#";
                const currentTrackName = track.name;
                const currentTime = track.date
                    ? track.date["#text"]
                    : "未知時間";

                if (
                    !lastTrackInfo.url ||
                    currentTrackUrl !== lastTrackInfo.url ||
                    currentTrackName !== lastTrackInfo.name ||
                    currentTime !== lastTrackInfo.time
                ) {
                    fetchCoverFromJson(track.name, track.artist["#text"])
                        .then((customImageUrl) => {
                            const imageUrl =
                                customImageUrl ||
                                (track.image[2]["#text"]
                                    ? track.image[2]["#text"]
                                    : 默認封面);
                            updateMusicBoxContent(
                                track,
                                imageUrl,
                                currentTrackUrl
                            );
                        })
                        .catch((error) => {
                            console.error("更新封面時出錯: ", error);
                        });

                    lastTrackInfo = {
                        url: currentTrackUrl,
                        name: currentTrackName,
                        time: currentTime,
                    };
                }
            } else {
                document.getElementById("musicbox").innerHTML =
                    "<p>無最近播放</p>";
            }
        })
        .catch((err) => {
            console.error("擷取Last.fm數據錯誤：", err);
            document.getElementById("musicbox").innerHTML =
                "<p>擷取數據錯誤</p>";
        });
}

// 创建并更新音乐盒内容的函数
function updateMusicBoxContent(track, imageUrl, currentTrackUrl) {
    const nowplaying =
        "@attr" in track &&
        "nowplaying" in track["@attr"] &&
        track["@attr"].nowplaying;
    const musicBox = document.getElementById("musicbox");
    musicBox.innerHTML = ""; // 清空现有内容

    const currentlyListening = document.createElement("b");
    currentlyListening.className = "currentlylistening";
    currentlyListening.innerHTML = `<span style="color:${
        nowplaying ? "#7bd88f" : "#ffffff80"
    };">●</span>　最近播放：`;
    musicBox.appendChild(currentlyListening);

    const trackLink = document.createElement("a");
    trackLink.href = currentTrackUrl;
    trackLink.target = "_blank";
    trackLink.className = "track";
    musicBox.appendChild(trackLink);

    const albumCover = document.createElement("img");
    albumCover.src = imageUrl ? imageUrl : 默認封面;
    albumCover.className = "albumcover";
    trackLink.appendChild(albumCover);

    const div = document.createElement("div");
    trackLink.appendChild(div);

    const songName = document.createElement("marquee");
    songName.className = "songname";
    songName.scrollAmount = "3";
    songName.textContent = track.name;
    songName.onmouseover = () => songName.stop();
    songName.onmouseout = () => songName.start();
    div.appendChild(songName);
    // const songNameElement = musicBox.querySelectorAll(".songName");
    // songNameElement.forEach((element) => {
    //     element.onmouseover = () => {
    //         element.stop();
    //     };
    //     element.onmouseout = () => {
    //         element.start();
    //     };
    // });

    const artist = document.createElement("div");
    artist.className = "artist";
    artist.textContent = track.artist ? track.artist["#text"] : "佚名";
    div.appendChild(artist);

    const lastPlayed = document.createElement("div");
    lastPlayed.className = "lastplayed";
    lastPlayed.textContent = nowplaying
        ? "只今在聴"
        : "上次聴：　" +
          (track.date
              ? new Date(track.date["#text"] + " UTC").toLocaleString("zh-TW", {
                    timeZone: "Asia/Shanghai",
                    hour12: false,
                })
              : "");
    musicBox.appendChild(lastPlayed);

    lastValidTrackUrl = currentTrackUrl; // 更新最后一次有效的链接
    setMusicBoxStyles(); // 设置样式
}

function setMusicBoxStyles() {
    const musicBox = document.getElementById("musicbox");
    musicBox.style.writingMode = "horizontal-tb";
    musicBox.style.width = "250px";
    musicBox.style.backgroundColor = "#1f1f1f";
    musicBox.style.border = "2px solid #383838";
    musicBox.style.borderRadius = "4px";
    musicBox.style.color = "#fff";
    musicBox.style.padding = "10px 15px";
    musicBox.style.margin = "5px 0";
    musicBox.style.fontFamily = "閹割Unifont";
    musicBox.style.boxShadow = "inset 0 0 6px rgba(70, 70, 70, .479)";
    musicBox.style.display = "block";

    const track = musicBox.querySelector(".track");
    if (track) {
        track.style.display = "flex";
        track.style.alignItems = "center";
    }

    const albumCover = musicBox.querySelector(".albumcover");
    if (albumCover) {
        albumCover.style.width = "50px";
        albumCover.style.height = "50px";
        albumCover.style.marginRight = "10px";
        albumCover.style.marginTop = "10px";
        if (!有封面嗎) {
            albumCover.style.imageRendering = "pixelated";
        }
    }

    const songName = musicBox.querySelector(".songname");
    if (songName) {
        songName.style.fontSize = "1.5em";
        songName.style.fontSmooth = "never";
        songName.style.webkitFontSmoothing = "none";
        songName.style.width = "150px";
    }

    const artist = musicBox.querySelector(".artist");
    if (artist) {
        artist.style.fontSize = "0.9em";
        artist.style.color = "#fff";
        artist.style.textShadow = "var(--body-text-shadow)";
        artist.style.maxWidth = "150px";
        artist.style.whiteSpace = "nowrap";
        artist.style.overflow = "hidden";
    }

    const lastPlayed = musicBox.querySelector(".lastplayed");
    if (lastPlayed) {
        lastPlayed.style.color = "gray";
        lastPlayed.style.fontSize = "0.8em";
        lastPlayed.style.marginTop = "8px";
    }

    const links = musicBox.querySelectorAll("a, a *");
    links.forEach((link) => {
        link.style.color = "white";
        link.style.textDecoration = "none";
    });

    const hoverElements = musicBox.querySelectorAll(
        "a *:not(div:not([class]))"
    );
    hoverElements.forEach((element) => {
        element.onmouseover = () => {
            element.style.textDecoration = "underline";
        };
        element.onmouseout = () => {
            element.style.textDecoration = "none";
        };
    });
}

// 初始更新
updateMusicBox();

// 每分鐘更新一次音樂盒信息
setInterval(updateMusicBox, 600);

// 監聽器設置，用於偵測鏈接變化
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length) {
            updateMusicBox();
        }
    });
});

// 設定監聽的目標節點及配置
const targetNode = document.querySelector("#musicbox");
const config = { childList: true };

// 啟動監聽
observer.observe(targetNode, config);
