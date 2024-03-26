橫向捲動();

/**                 執   行   區                 **/

function 橫向捲動() {
  document.addEventListener(
    "wheel",
    function (e) {
      var delta = e.deltaY;

      if (e.shiftKey) {
        e.preventDefault();
        window.scrollBy({ top: delta, behavior: "smooth" });
      } else if (e.altKey + e.ctrlKey + e.metaKey) {
      } else {
        e.preventDefault();
        window.scrollBy({ left: -delta, behavior: "smooth" });
      }
    },
    { passive: false }
  );
}
