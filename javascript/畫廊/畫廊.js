var displays = {};

var 展示區 = null;
var 展示項目 = null;

document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggleLabel = document.getElementById("sidebarToggleLabel");
    const sidebarToggle = document.getElementById("sidebarToggle");

    document.addEventListener("mousemove", (e) => 動(e));

    document.querySelectorAll("#展示>div.展示項目").forEach((element) => {
        const 識別符 = element.getAttribute("識別符");
        displays[識別符] = element.style.display;
    });

    展示區 = document.querySelector("#展示");
    展示項目 = Array.from(document.querySelectorAll("#展示>div.展示項目"));

    hash變動(location.hash);

    document.querySelectorAll("#content>button").forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("button-clicked");
            setTimeout(function () {
                button.classList.toggle("button-clicked");
            }, 200);
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function hash變動(hash) {
    const 全部UI = document.getElementById("全部UI");
    const hashContent = decodeURIComponent(hash.slice(1));
    if (hash && hashContent) {
        document.title = `畫廊 - ${hashContent}`;
        全部UI.hasAttribute("配色主題") &&
            全部UI.setAttribute("配色主題", hashContent);
    } else {
        document.title = `畫廊`;
    }
    if (展示項目 && 展示區) {
        removeAllChildNodes(展示區);
        展示項目.forEach((element) => {
            const 識別符 = element.getAttribute("識別符");
            if (識別符 && 識別符 === hashContent) {
                element.style.display = displays.hasOwnProperty(識別符)
                    ? displays[識別符]
                    : "flex";
                展示區.appendChild(element);
            }
        });
    }

    document.getElementById("開屏").style.opacity = 1;

    sidebar滾動條();
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

function sidebar滾動條() {
    function adjustAlphaHex(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        let alphaHex = Math.round(alpha * 255)
            .toString(16)
            .padStart(2, "0");

        return `#${r.toString(16).padStart(2, "0")}${g
            .toString(16)
            .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${alphaHex}`;
    }

    function fillTemplate(template, variables) {
        return template.replace(
            /#\{([^\}]+)\}#/g,
            (_, key) => variables[key] || ""
        );
    }

    const 滾動條樣 = {
        矢上: `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="48" height="48" viewBox="-2 -4 24 24"%3E%3Cpath fill="%23#{color}#" d="m12.547 1.621l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z"%2F%3E%3C%2Fsvg%3E`,
        矢上縮: `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="48" height="48" transform="scale(0.9)" viewBox="-2 -4 24 24"%3E%3Cpath fill="%23#{color}#" d="m12.547 1.621l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z"%2F%3E%3C%2Fsvg%3E`,
        矢下: `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="48" height="48" viewBox="-2 -4 24 24"%3E%3Cg transform="rotate(180 10 8)"%3E%3Cpath fill="%23#{color}#" d="m12.547 1.621l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E`,
        矢下縮: `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="48" height="48" transform="scale(0.9)" viewBox="-2 -4 24 24"%3E%3Cg transform="rotate(180 10 8)"%3E%3Cpath fill="%23#{color}#" d="m12.547 1.621l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E`,
    };

    const 全部UI = document.querySelector("#全部UI");
    const colorBar = getComputedStyle(全部UI).getPropertyValue(
        "--colorSidebarScrollbar"
    );
    const colorBarBG = getComputedStyle(全部UI).getPropertyValue(
        "--colorSidebarScrollbarBG"
    );
    const sidebar = document.getElementById("sidebar");
    sidebar.style.setProperty("--滾動條：背景色", colorBarBG);
    sidebar.style.setProperty("--滾動條：三角背景色", colorBarBG);
    sidebar.style.setProperty("--滾動條：交界背景色", colorBarBG);
    sidebar.style.setProperty("--滾動條：條色", colorBar);
    sidebar.style.setProperty(
        "--滾動條：條色及",
        adjustAlphaHex(colorBar, 0.8)
    );
    sidebar.style.setProperty(
        "--滾動條：條色作",
        adjustAlphaHex(colorBar, 0.5)
    );
    sidebar.style.setProperty(
        "--滾動條：矢上常",
        `url('${fillTemplate(滾動條樣.矢上, {
            color: colorBar.replace(/^#/, ""),
        })}')`
    );
    sidebar.style.setProperty(
        "--滾動條：矢上及",
        `url('${fillTemplate(滾動條樣.矢上, {
            color: adjustAlphaHex(colorBar, 0.8).replace(/^#/, ""),
        })}')`
    );
    sidebar.style.setProperty(
        "--滾動條：矢上作",
        `url('${fillTemplate(滾動條樣.矢上縮, {
            color: adjustAlphaHex(colorBar, 0.5).replace(/^#/, ""),
        })}')`
    );
    sidebar.style.setProperty(
        "--滾動條：矢下常",
        `url('${fillTemplate(滾動條樣.矢下, {
            color: colorBar.replace(/^#/, ""),
        })}')`
    );
    sidebar.style.setProperty(
        "--滾動條：矢下及",
        `url('${fillTemplate(滾動條樣.矢下, {
            color: adjustAlphaHex(colorBar, 0.8).replace(/^#/, ""),
        })}')`
    );
    sidebar.style.setProperty(
        "--滾動條：矢下作",
        `url('${fillTemplate(滾動條樣.矢下縮, {
            color: adjustAlphaHex(colorBar, 0.5).replace(/^#/, ""),
        })}')`
    );
}
