function 複製今日道曆() {
    try {
        const textToCopy =
            轉換道曆(new Date(), 1, `/---/\nwww\tyyyy/mm/dd/`) +
            window.填充0(new Date().getHours(), 2) +
            ":" +
            window.填充0(new Date().getMinutes(), 2);
        navigator.clipboard.writeText(textToCopy);
    } catch (err) {}
}
function 刷新网䈎() {
    location.reload(true);
}
