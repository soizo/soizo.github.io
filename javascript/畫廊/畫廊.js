var displays = {};

document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggleLabel = document.getElementById("sidebarToggleLabel");
    const sidebarToggle = document.getElementById("sidebarToggle");

    document.addEventListener("mousemove", (e) => 動(e));

    document.querySelectorAll("#展示>div.展示項目").forEach((element) => {
        const 識別符 = element.getAttribute("識別符");
        displays[識別符] = element.style.display;
    });

    hash變動(location.hash);

    document.querySelectorAll("#content>button").forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("button-clicked");
        });
    });

    document.querySelectorAll("#content>button>svg>rect").forEach((element) => {
        const rect = element.getBoundingClientRect();
        element.style.opacity = 0;
    });
});

let 如如不動timeout;

document.addEventListener("mousemove", function () {
    clearTimeout(如如不動timeout);
    document.body.style.cursor = "auto";
    如如不動timeout = setTimeout(() => {
        if (!sidebarToggle.checked) {
            document.body.style.cursor = "none";
        }
    }, 1000);
});

window.addEventListener("hashchange", () => {
    hash變動(location.hash);
});

function hash變動(hash) {
    console.log(hash);
    const 全部UI = document.getElementById("全部UI");
    const hashContent = decodeURIComponent(hash.slice(1));
    if (hash && hashContent) {
        document.title = `畫廊 - ${hashContent}`;
        全部UI.hasAttribute("配色主題") &&
            全部UI.setAttribute("配色主題", hashContent);
    } else {
        document.title = `畫廊`;
    }
    document.querySelectorAll("#展示>div.展示項目").forEach((element) => {
        const 識別符 = element.getAttribute("識別符");
        if (識別符 && 識別符 == hashContent) {
            element.style.display = displays.hasOwnProperty(識別符)
                ? displays[識別符]
                : "flex";
        } else {
            element.style.display = "none";
        }
    });
}

function 動(e) {
    function scaleDistValue(dist, minDist, maxDist, minValue, maxValue) {
        if (dist < minDist) {
            return minValue;
        } else if (dist > maxDist) {
            return maxValue;
        } else {
            const scale = (dist - minDist) / (maxDist - minDist);
            return minValue + (maxValue - minValue) * scale;
        }
    }

    function distToCenter(rect) {
        const distX = e.clientX - (rect.left + rect.width / 2);
        const distY = e.clientY - (rect.top + rect.height / 2);

        const dist = Math.sqrt(distX * distX + distY * distY);
        return dist;
    }

    sidebarToggleLabel.style.opacity = (() => {
        const rect = sidebarToggleLabel.getBoundingClientRect();
        return scaleDistValue(distToCenter(rect), 0, 50, 0.8, 0);
    })();

    document.querySelectorAll("#content>button>svg>rect").forEach((element) => {
        const rect = element.getBoundingClientRect();
        element.style.opacity = scaleDistValue(distToCenter(rect), 0, 50, 1, 0);
    });
}
