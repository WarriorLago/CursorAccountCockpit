(function () {
  var root = document.getElementById("platform-recommendation");
  if (!root) return;

  var lang = document.documentElement.lang === "en" ? "en" : "zh";
  var isMac = /Macintosh|Mac OS X|Mac_PowerPC/i.test(navigator.userAgent) || /Mac/i.test(navigator.platform || "");
  var isWindows = /Windows/i.test(navigator.userAgent) || /Win/i.test(navigator.platform || "");
  var platform = isMac ? "macos" : isWindows ? "windows" : "other";
  var dataUrl = new URL("platform-releases.json", document.currentScript && document.currentScript.src || location.href);

  function render(data) {
    var copy = lang === "en" ? {
      detected: platform === "other" ? "Platform not identified" : "Detected on this device",
      other: "You can download either platform below",
      recommended: "Recommended for this device",
      allPlatforms: "All platform downloads",
      highlighted: "Best match",
      version: "Version",
      setup: "Download installer",
      portable: "Portable",
      universal: "Universal DMG",
      arm64: "Apple Silicon",
      x64: "Intel Mac",
      note: "We highlighted the matching package and kept every platform visible.",
    } : {
      detected: platform === "other" ? "暂未识别当前平台" : "已检测到当前设备",
      other: "下面仍保留全部平台的下载入口",
      recommended: "适合此设备的版本",
      allPlatforms: "全部平台下载",
      highlighted: "推荐",
      version: "版本",
      setup: "下载安装包",
      portable: "便携版",
      universal: "通用 DMG",
      arm64: "Apple 芯片",
      x64: "Intel Mac",
      note: "已突出显示匹配版本，同时保留 Windows 与 macOS 的完整入口。",
    };
    function platformCard(key, item) {
      var isRecommended = key === platform;
      var links = key === "windows"
        ? '<a class="btn btn-primary" href="' + item.setup + '">' + copy.setup + '</a>' +
          '<a class="btn btn-ghost" href="' + item.portable + '">' + copy.portable + '</a>'
        : '<a class="btn btn-primary" href="' + item.universal + '">' + copy.universal + '</a>' +
          '<a class="btn btn-ghost" href="' + item.arm64 + '">' + copy.arm64 + '</a>' +
          '<a class="btn btn-ghost" href="' + item.x64 + '">' + copy.x64 + '</a>';
      return '<article class="platform-card' + (isRecommended ? ' is-recommended' : '') + '">' +
        '<div class="platform-card-head"><div><span class="platform-icon">' + (key === "windows" ? '▣' : '●') + '</span>' +
        '<strong>' + item.label + '</strong></div>' +
        (isRecommended ? '<span class="platform-match">' + copy.highlighted + '</span>' : '') + '</div>' +
        '<span class="platform-version">' + copy.version + ' ' + item.version + '</span>' +
        '<div class="platform-card-actions">' + links + '</div></article>';
    }
    root.innerHTML =
      '<div class="platform-recommendation-head"><div class="platform-recommendation-copy">' +
      '<span class="eyebrow">' + (platform === "other" ? copy.allPlatforms : copy.recommended) + '</span>' +
      '<strong>' + copy.detected + '</strong><small>' + (platform === "other" ? copy.other : copy.note) + '</small>' +
      '</div><span class="platform-detected-badge">' + (platform === "other" ? "—" : data[platform].label) + '</span></div>' +
      '<div class="platform-options">' + platformCard("windows", data.windows) + platformCard("macos", data.macos) + '</div>';
  }

  fetch(dataUrl, { cache: "no-cache" })
    .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
    .then(render)
    .catch(function () {
      root.className = "platform-recommendation is-neutral";
      root.textContent = lang === "en" ? "Open Download to choose a package." : "请打开下载页选择安装包。";
    });
})();
