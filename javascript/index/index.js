function updateLatestGitUpdateTime() {
    // 假設API URL是這樣的，這裡需要替換成實際的倉庫API URL
    const apiUrl = "https://api.github.com/repos/soizo/soizo.github.io";

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const lastUpdateTime = new Date(data.pushed_at); // GitHub API中通常使用pushed_at表示最後推送時間
            const formattedTime = window.轉換道曆(
                lastUpdateTime,
                undefined,
                "YYYY·MM·DD·HHQQ"
            ); // 轉換為易讀的格式

            // 獲取ID為'GIT：今倉庫最近更新時間'的元素並更新其內容
            document.getElementById("GIT：今倉庫最近更新時間").innerHTML =
                `:=${formattedTime}$扁=:`;
        })
        .catch((error) => {
            console.error("更新失敗:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    updateLatestGitUpdateTime();
});
