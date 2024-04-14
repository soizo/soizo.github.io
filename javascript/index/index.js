document.addEventListener("DOMContentLoaded", function () {
    if (
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
        navigator.userAgent.match(/AppleWebKit/)
    ) {
        document
            .querySelector('meta[name="viewport"]')
            .setAttribute(
                "content",
                "height=device-height, initial-scale=0.85"
            );
    }
});
