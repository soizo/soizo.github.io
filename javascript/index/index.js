document.addEventListener("DOMContentLoaded", function () {
    if (
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
        navigator.userAgent.match(/AppleWebKit/)
    ) {
        document
            .querySelector('meta[name="viewport"]')
            .setAttribute("content", "width=device-width, initial-scale=0.9");
    }
});
