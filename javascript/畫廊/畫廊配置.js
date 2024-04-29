var 目錄 = {
    匣污系: {
        赤景靑面怒視目: "赤景靑面怒視目",
        法顯東石謔諧然: "法顯東石謔諧然",
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelector("#sidebar");
    function objectToHTML(obj) {
        let html = "<ul>";
        for (let key in obj) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                html += `<li>${key}</li><ul>`;
                for (let innerKey in obj[key]) {
                    html += `<li><a href="#${obj[key][innerKey]}">${innerKey}</a></li>`;
                }
                html += "</ul>";
            }
        }
        html += "</ul>";
        return html;
    }
    sidebarLinks.innerHTML = objectToHTML(目錄);
});

function 上翻䈎() {}
function 下翻䈎() {}
