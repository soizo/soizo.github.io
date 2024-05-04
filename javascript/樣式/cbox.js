const 資源 = {
    accept: "/assets/圖象/方圖標/accept.jpg",
    delete: "/assets/圖象/方圖標/delete.jpg",
    RSS: "/assets/圖象/方圖標/RSS.jpg",
    like: "/assets/圖象/方圖標/like.png",
    下箭頭: "/assets/圖象/方圖標/下箭頭.png",
    上箭頭: "/assets/圖象/方圖標/上箭頭.png",
};

const cboxElmt = document.getElementById("cbox");
cboxElmt.classList.add("自訂滾動條");
cboxElmt.setAttribute("滾動條theme", "泉此方綠反轉");

const HCB_comment_box = document.createElement("div");
HCB_comment_box.id = "HCB_comment_box";
HCB_comment_box.textContent = "正在載入留言板！";
HCB_comment_box.style.cursor = "wait";

cboxElmt.appendChild(HCB_comment_box);

if (!window.hcb_user) {
    window.hcb_user = {};
}
(function () {
    const hcb_max_retries = 3; // 最大重試次數
    let hcb_retry_count = 0; // 目前重試次數

    function loadHCBScript() {
        if (hcb_retry_count >= hcb_max_retries) {
            console.error("HTML Comment Box 載入失敗超過最大重試次數");
            HCB_comment_box.textContent = "留言板載入失敗";
            HCB_comment_box.style.cursor = "not-allowed";
            return;
        }

        var s = document.createElement("script");
        var l =
            window.hcb_user.PAGE || ("" + window.location).replace(/'/g, "%27");
        var h = "https://www.htmlcommentbox.com";
        s.type = "text/javascript";
        s.src = `${h}/jread?page=${encodeURIComponent(l).replace(
            /\+/g,
            "%2B"
        )}&mod=%241%24wq1rdBcg%24ReravW%2FXr20IKckzhEvFl0&opts=16798&num=10&ts=1713391301796`;
        // console.log(s.src);

        s.onerror = function () {
            console.error("HTML Comment Box 載入失敗，正在嘗試重新載入...");
            HCB_comment_box.textContent = "留言板載入失敗，正在嘗試重新載入";
            HCB_comment_box.style.cursor = "wait";
            hcb_retry_count++;
            loadHCBScript();
        };

        s.onload = function () {
            HCB_comment_box.style.cursor = "auto";
        };

        document.getElementsByTagName("head")[0].appendChild(s);
    }

    // 首次載入
    loadHCBScript();
})();

// 使用MutationObserver來監視新元素的添加
const observerHCB_comment_box = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (
                node.tagName === "STYLE" &&
                (!node.getAttribute("data-備註") ||
                    node.getAttribute("data-備註") != "自定義cbox")
            ) {
                node.parentNode.removeChild(node);
            }
            if (node instanceof HTMLElement) {
                主函數(node);
            }
        });
    });
});

// 启动观察者
observerHCB_comment_box.observe(HCB_comment_box, {
    childList: true,
    subtree: true,
});

///                                                                     ///
///                                  函數                                 ///
///                                                                     ///

function 主函數(node) {
    設置留言監聽器(node);

    獲得定位(node, "#hcb_settings", function (node1) {
        node1.innerHTML = `<img style="width:16px;height:16px;image-rendering:pixelated;" src="/assets/絵文字/工.png" />`;
    });
    獲得定位(node, "#hcb_form_name", function (node1) {
        node1.placeholder = "名稱";
        node1.classList.add("unselectable");
    });
    獲得定位(node, "#hcb_form_name_container>textarea", function (node1) {
        node1.placeholder = "此処鍵入發送文本";
        node1.classList.add("unselectable");
        node1.classList.add("自訂滾動條");
        node1.classList.add("橫向捲動");
        node1.setAttribute("滾動條theme", "泉此方綠反轉");
        node1.removeAttribute("rows");
    });
    獲得定位(node, "#hcb_submit", function (node1) {
        node1.value = "發送";
        node1.removeAttribute("title");
    });
    獲得定位(node, "#hcb_file_label>a", function (node1) {
        node1.textContent = "添加文件";
        node1.removeAttribute("title");
    });
    獲得定位(node, "#hcb_form > div.home-desc", function (node1) {
        node1.classList.add("unselectable");
        node1.innerHTML = `<a target="_blank" href="https://www.htmlcommentbox.com">ＨＴＭＬ留言箱</a>`;
        node1.removeAttribute("title");
    });
    獲得定位(node, "#hcb_form > div:nth-child(9)", function (node1) {
        node1.classList.add("unselectable");
        node1.classList.add("undraggable");
    });
    獲得定位(node, "#hcb_form_content", function (node1) {
        node1.removeAttribute("title");
    });
    獲得定位(node, "#hcb_subscribe > span", function (node1) {
        node1.textContent = "回覆电郵傳我";
    });
    獲得定位(node, "#HCB_comment_box > a", function (node1) {
        node1.classList.add("unselectable");
    });
    獲得定位(node, "#no_comments", function (node1) {
        node1.innerHTML = "<i>没有任何留言！你來發一條罷！</i>";
    });
    獲得定位(node, "#hcb_subscribe > span", function (node1) {
        node1.classList.add("unselectable");
    });
    獲得定位(node, "#HCB_comment_box > a > img.hcb-icon", function (node1) {
        node1.classList.add("unselectable");
        node1.src = 資源["RSS"];
        node1.style.width = "20px";
        node1.style.height = "20px";
        node1.style.borderRadius = "4px";
    });

    // 獲得定位(node, "#hcb_form_name", function (node1) {
    //     var hcb_form_namePreviousValue = "";
    //     node1.addEventListener("input", function () {
    //         console.log("object");
    //         if (document.activeElement !== node1) {
    //             if (
    //                 hcb_form_namePreviousValue === "" &&
    //                 node1.value === "Anonymous"
    //             ) {
    //                 node1.value = "Hello";
    //             }
    //         }
    //         hcb_form_namePreviousValue = node1.value;
    //     });
    // });

    observeElementAddition("#HCB_comment_form_box > button", function (node1) {
        if (node1 instanceof HTMLElement) {
            node1.textContent = "再發一條";
        }
    });

    observeElementAddition("#replying_to_container", function (node1) {
        node1.innerHTML =
            `<br/>` +
            String(node1.textContent).replace(/^ is replying to /, "正在回覆 ");
    });

    observeInnerHTMLChange("#hcb_msg", function (node1) {
        if (node1 instanceof HTMLElement) {
            // console.log(node1.textContent);
            const 原文 = String(node1.textContent);
            const 文本 = (function (原文) {
                switch (原文) {
                    case "Thank you for commenting!":
                        return "感謝留言！";
                    case "Your comment was not posted because it was empty!":
                        return "空評論未發出！";
                    case "Post another comment":
                        return "另外發个評論";
                    default:
                        return 原文;
                }
            })(原文);
            node1.textContent = 文本;
        }
    });

    if (node.tagName === "A") {
        node.classList.add("unselectable");
        node.setAttribute("target", "_blank");
    }

    if (node.id === "HCB_comment_form_box") {
        node.querySelectorAll("*").forEach(function (child) {
            child.classList.add("unselectable");
        });
    }

    if (node.id === "comments_list") {
        node.querySelectorAll(".comment").forEach(function (element) {
            comment_修改(element);
        });
    }

    if (node.tagName === "H3") {
        node.textContent = "留言板";
        node.classList.add("unselectable");
        改變標籤(node, "h1");
    }

    observeInnerHTMLChange(
        "#HCB_comment_box > p:nth-of-type(2)", // 使用正確的CSS選擇器
        function (node1, observer) {
            try {
                const 執行 = function (node2) {
                    const 下箭頭 = node2.querySelector(
                        `p:nth-of-type(2) > b > img[alt="[next]"]`
                    );
                    const 上箭頭 = node2.querySelector(
                        `p:nth-of-type(2) > b > img[alt="[prev]"]`
                    );
                    if (下箭頭 !== null) {
                        下箭頭.src = 資源["下箭頭"];
                        下箭頭.parentNode.style.padding = 0;
                        下箭頭.parentNode.style.paddingTop = "4px";
                    } else if (上箭頭 !== null) {
                        上箭頭.src = 資源["上箭頭"];
                        上箭頭.parentNode.style.padding = 0;
                        上箭頭.parentNode.style.paddingBottom = "4px";
                    } else {
                    }
                };

                observer.disconnect(); // 斷開觀察，防止觸發迴圈

                // 添加unselectable class
                node1.classList.add("unselectable");

                // 決定替換哪個子節點的文本
                var textNode = null;
                for (var i = 0; i < node1.childNodes.length; i++) {
                    if (
                        node1.childNodes[i].nodeType === Node.TEXT_NODE &&
                        / Showing \d+ to \d+ /.test(
                            node1.childNodes[i].textContent
                        )
                    ) {
                        textNode = node1.childNodes[i];
                        break;
                    }
                }

                if (textNode) {
                    // 替換文本
                    const 原文 = textNode.textContent;
                    const 替換文本 = 原文.replace(
                        / Showing (\d+) to (\d+) /g,
                        function (〇, 一, 二) {
                            return `示 ${一} 至 ${二} 䈎`;
                        }
                    );

                    // 僅當內容有變化時更新textContent並重新觀察
                    if (原文 !== 替換文本) {
                        textNode.textContent = 替換文本;
                        執行(node1);
                        // 只在第一次更改後重新監聽
                        observer.observe(
                            document.querySelector("#HCB_comment_box"),
                            {
                                childList: true,
                                subtree: true,
                                characterData: true,
                            }
                        );
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    );
}

function 獲得定位(node, 定位, callback) {
    try {
        const element = node.querySelector(定位);
        if (element) {
            callback(element);
        } else {
            // console.error(element);
        }
    } catch (error) {
        console.error(node);
    }
}

function 改變標籤(node, 目標標籤) {
    node.parentNode.replaceChild(
        (function () {
            const newNode = document.createElement(目標標籤);
            newNode.innerHTML = node.innerHTML;
            Array.from(node.attributes).forEach((attr) =>
                newNode.setAttribute(attr.nodeName, attr.nodeValue)
            );
            return newNode;
        })(),
        node
    );
}

function comment_like_onclick(elementID) {
    const comment = document.getElementById("comment_" + elementID);

    const likesContent = comment.querySelector("div.likes>span");
    if (likesContent.textContent != " ") {
        console.log(likesContent.textContent);
        const likesContentNum = likesContent.textContent.match(/^\S+/);
        const num = window.chineseToNumber(String(likesContentNum));
        likesContent.textContent = num + " ";

        hcb.like(elementID);

        likesContent.textContent = window.numberToChinese(num + 1) + " ";
    } else {
        hcb.like(elementID);

        likesContent.textContent = window.numberToChinese(1) + " ";
    }
}

function comment_修改(element) {
    const elementID = element.id.match(/(?<=comment_)\d+$/);

    // console.log(element);
    element.classList.add("unselectable");
    element.classList.add("undraggable");
    element
        .querySelector("blockquote > span.author > b")
        .classList.add("selectableAsText");
    element
        .querySelector("blockquote>.hcb-comment-body")
        .classList.add("selectableAsText");

    const like = element.querySelector("p.hcb-comment-tb > button.hcb-like");
    like.textContent = "按讚" + "　";
    like.setAttribute("onclick", `comment_like_onclick(${elementID})`);
    const likes = element.querySelectorAll("div.likes *");

    likes.forEach(function (aaa) {
        aaa.classList.add("unselectable");
    });

    try {
        const likesContent = element.querySelector("div.likes>span");
        const likesContentNum = likesContent.textContent.match(/^\d+/);
        likesContent.textContent =
            window.numberToChinese(likesContentNum) + " ";
    } catch (err) {}

    const reply = element.querySelector("p.hcb-comment-tb > button.hcb-reply");
    reply.textContent = "回覆" + "　";

    const flag = element.querySelector("p.hcb-comment-tb > button.hcb-flag");
    flag.textContent = "檢舉" + "　";

    try {
        const CommentContent = element.querySelector(
            ".comment>div>.comment>blockquote > p"
        );
        const 內裏內容 = String(CommentContent.innerHTML);
        CommentContent.innerHTML = 內裏內容.replace(
            /^@(\S+), /,
            function (〇, 一) {
                return `<span class="unselectable" style="text-decoration:underline;">＠${一}</span><span class="unselectable">　</span>`;
            }
        );
    } catch (err) {}

    const date = element.querySelector("blockquote > span.date");
    date.style.outline = "none";
    const dateContent = String(date.textContent);
    let realDateContent = dateContent.match(/(?<=^· )[\s\S]+$/);
    if (realDateContent) {
        realDateContent = realDateContent[0];
        const newRealDateContent = (function (realDateContent) {
            if (realDateContent == "within the last minute") {
                return "只今";
            } else if (
                (matchMinutes = realDateContent.match(/^\d+(?= minutes ago$)/))
            ) {
                matchMinutes = matchMinutes[0];
                if (matchMinutes >= 34 && matchMinutes <= 25) {
                    return `半小時歬`;
                } else if (matchMinutes < 7.12) {
                    return window.numberToChinese(matchMinutes) + `分鐘歬`;
                } else {
                    const base = 14.24;
                    let 刻 = Math.floor(matchMinutes / base);
                    let 餘數 = matchMinutes % base;

                    if (餘數 >= base / 2) {
                        return window.numberToChinese(刻) + `刻半歬`;
                    } else {
                        return window.numberToChinese(刻) + `刻歬`;
                    }
                }
            } else if (
                (matchHours = realDateContent.match(/^\d+(?= hours ago$)/))
            ) {
                matchHours = matchHours[0];
                const 大時 = Math.floor(Number(matchHours) / 2);
                const 餘 = Number(matchHours) % 2;
                if (餘) {
                    if (大時) {
                        return window.numberToChinese(大時) + `時半歬`;
                    } else {
                        return `半時歬`;
                    }
                } else {
                    return window.numberToChinese(大時) + `時歬`;
                }
            } else if (
                (matchDays = realDateContent.match(/^\d+(?= days ago$)/))
            ) {
                matchDays = matchDays[0];
                return window.numberToChinese(matchDays) + `日歬`;
            } else if (new Date(realDateContent)) {
                date.classList.add("時間");
                return window.轉換道曆(
                    realDateContent,
                    undefined,
                    ":=YYYY年MMDD$扁=:"
                );
            } else {
                return realDateContent;
            }
        })(realDateContent);
        date.textContent = newRealDateContent;
    }

    const name = element.querySelector("blockquote > span.author > b");
    const nameName = String(name.innerHTML);
    nameRegex = /^([\s\S]+) \(mod\) $/g;
    if (nameName.match(nameRegex)) {
        name.innerHTML = nameName.replace(nameRegex, function (〇, 一) {
            return 一 + `　<span class="版主稱號">版主</span>`;
        });
    }

    try {
        const approvalMsg = element.querySelector("p.approval-msg");
        approvalMsg.textContent = "註：留言未發佈　待審核";
    } catch (err) {}

    try {
        const acceptButton = element.querySelector(
            "b.hcb-link.del.approval-msg > img"
        );
        acceptButton.title = "通過此留言";
        acceptButton.src = 資源["accept"];
        acceptButton.style.height = "16px";
        acceptButton.style.width = "16px";
        acceptButton.style.imageRendering = "pixelated";
        acceptButton.style.borderRadius = "4px";
        acceptButton.draggable = false;
    } catch (err) {}
    try {
        const deleteButton = element.querySelector("b:nth-child(1) > img");
        deleteButton.title = "刪除此留言";
        deleteButton.src = 資源["delete"];
        deleteButton.style.height = "16px";
        deleteButton.style.width = "16px";
        deleteButton.style.imageRendering = "pixelated";
        deleteButton.style.borderRadius = "4px";
        deleteButton.draggable = false;
    } catch (err) {}
    try {
        const likeIcon = element.querySelector("div.likes > img");
        likeIcon.src = 資源["like"];
        likeIcon.style.height = "16px";
        likeIcon.style.width = "16px";
        likeIcon.style.imageRendering = "pixelated";
        likeIcon.draggable = false;
    } catch (err) {}
}

function 設置留言監聽器(node) {
    function 執行(node) {
        if (node instanceof HTMLElement) {
            comment_修改(node);
        }
    }
    // 為符合條件的元素設置MutationObserver
    function setUpObserverForComments(element) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (
                            node instanceof HTMLElement &&
                            node.id.startsWith("comment_")
                        ) {
                            執行(node);
                            setUpObserverForComments(node);
                        }
                    });
                }
            });
        });

        observer.observe(element, {
            childList: true,
            subtree: true,
        });
    }

    if (node.id && node.id.startsWith("comment_")) {
        執行(node);
        setUpObserverForComments(node);
    }

    if (node.childNodes.length > 0) {
        node.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
                設置留言監聽器(child);
            }
        });
    }
}

function observeElementAddition(elementSelector, callback) {
    // 創建MutationObserver，監測DOM變化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const targetElement =
                            node.querySelector(elementSelector);
                        if (targetElement) {
                            callback(targetElement);
                        }
                        // 檢查node本身是否匹配選擇器
                        if (node.matches(elementSelector)) {
                            callback(node);
                        }
                    }
                });
            }
        });
    });

    // 設置監測配置，監測整個document的子節點變化
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    // 返回observer實例以便外部可以停止監測
    return observer;
}

function observeInnerHTMLChange(elementSelector, callback) {
    // 確定目標元素是否存在
    const targetElement = document.querySelector(elementSelector);
    if (!targetElement) {
        // console.warn(`警告: 沒有找到匹配的元素"${elementSelector}"`);
        return null;
    }

    // 創建MutationObserver來監測內容變化
    const observer = new MutationObserver((mutations) => {
        // observer.disconnect();
        mutations.forEach((mutation) => {
            if (
                mutation.type === "childList" ||
                mutation.type === "characterData"
            ) {
                callback(targetElement, observer);
            }
        });
        // observer.observe(targetElement, {
        //     childList: true,
        //     subtree: true,
        //     characterData: true,
        // });
    });

    // 設置監測配置，監測子元素變化和文本節點的變化
    observer.observe(targetElement, {
        childList: true,
        subtree: true,
        characterData: true,
    });

    // 返回observer實例以便外部可以停止監測
    return observer;
}

function observeElementRemoval(elementSelector, callback) {
    // 創建MutationObserver，監測DOM變化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.matches(elementSelector)
                ) {
                    callback(node);
                }
            });
        });
    });

    // 設置監測配置，監測整個document的子節點移除
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    // 返回observer實例以便外部可以停止監測
    return observer;
}
