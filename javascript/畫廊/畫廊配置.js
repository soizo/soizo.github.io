function updateSidebar() {
    const sidebarLinks = document.querySelector("#sidebar");
    sidebarLinks.innerHTML = objectToHTML(目錄);
}

let 目錄鋪平 = {};
fetch("/json/畫廊/目錄.json")
    .then((response) => response.json())
    .then((data) => {
        目錄 = data;
        目錄鋪平 = extractStringValues(目錄);
        updateSidebar();
        document.addEventListener("DOMContentLoaded", updateSidebar);
    });

function extractStringValues(obj) {
    let result = {};
    function recurse(subObj) {
        Object.entries(subObj).forEach(([key, value]) => {
            if (typeof value === "object" && value !== null) {
                if (value.show && typeof value.show === "string") {
                    result[key] = value.show;
                }
                recurse(value);
            }
        });
    }
    recurse(obj);
    return result;
}

function objectToHTML(obj) {
    let i = 0;
    let html = `<ul id="sidebar夾">`;
    for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            html += `<label for="sidebar夾Toggle_${i}" class="sidebar夾ToggleLabel">${key}</label><input type="checkbox" id="sidebar夾Toggle_${i}" style="display:none;" class="sidebar夾Toggle"><ul class="sidebar夾裏">`;
            for (let innerKey in obj[key]) {
                if (
                    typeof obj[key][innerKey] === "object" &&
                    obj[key][innerKey] !== null
                ) {
                    const displayName = obj[key][innerKey].show || innerKey;
                    html += `<li><a href="#${innerKey}">${displayName}</a></li>`;
                }
            }
            html += `</ul>`;
        }
        i++;
    }
    html += `</ul>`;
    return html;
}

function 上翻䈎() {
    const hashContent = decodeURIComponent(location.hash.slice(1));
    const values = Object.keys(目錄鋪平);
    const valueIndex = values.indexOf(hashContent);
    if (valueIndex > 0) {
        location.hash = values[valueIndex - 1];
    } else {
        location.hash = values[values.length - 1];
    }
}

function 下翻䈎() {
    const hashContent = decodeURIComponent(location.hash.slice(1));
    const values = Object.keys(目錄鋪平);
    const valueIndex = values.indexOf(hashContent);
    if (valueIndex < values.length - 1) {
        location.hash = values[valueIndex + 1];
    } else {
        location.hash = values[0];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowUp" || e.key == "ArrowLeft") {
            上翻䈎();
        }
        if (e.key == "ArrowDown" || e.key == "ArrowRight") {
            下翻䈎();
        }
    });
});
