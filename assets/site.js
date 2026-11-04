(function () {
  document.querySelectorAll("[data-tour]").forEach(function (tour) {
    var tabs = Array.prototype.slice.call(tour.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (item) {
        var on = item === tab;
        item.setAttribute("aria-selected", on ? "true" : "false");
        item.tabIndex = on ? 0 : -1;
        document.getElementById(item.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (event) {
        var step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        select(tabs[(index + step + tabs.length) % tabs.length], true);
      });
    });
  });
})();