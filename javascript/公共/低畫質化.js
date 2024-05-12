if (低畫質開關 !== false && !低畫質開關) {
    var 低畫質開關 = true;
}

if (低畫質Config !== false && !低畫質Config) {
    var 低畫質Config = {
        quality: "random",
        quality_random_min: 5,
        quality_random_max: 10,
        quality_random_divide: 100,
        delay: 3,
    };
}

document.addEventListener("DOMContentLoaded", function () {
    let imageElement = document.getElementById("网䈎顯示img");
    let 圖後 = document.getElementById("圖後");

    // 圖後.addEventListener("load", () => {});

    setImage();
    async function setImage() {
        if (低畫質開關) {
            if (imageElement.style.display == "none") {
                imageElement.style.display = "block";
            }
            const base64JPEG = await capturePageAsBase64JPEG();
            if (base64JPEG) {
                imageElement.src = base64JPEG;
            }
        } else {
            imageElement.style.display = "none";
        }
        setTimeout(setImage, 低畫質Config.delay);
    }
});

async function capturePageAsBase64JPEG() {
    try {
        const dataUrl = await domtoimage.toJpeg(
            document.querySelector("#圖後"),
            {
                // quality: getRandomInt(1, 30) / 100,
                quality:
                    低畫質Config.quality === "random"
                        ? getRandomInt(
                              低畫質Config.quality_random_min,
                              低畫質Config.quality_random_max
                          ) / 低畫質Config.quality_random_divide
                        : 低畫質Config.quality,
            }
        );
        return dataUrl;
    } catch (error) {
        console.error("oops, something went wrong!", error);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
