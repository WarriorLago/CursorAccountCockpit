(function () {
  var root = document.getElementById("platform-recommendation");
  if (!root) return;

  var lang = document.documentElement.lang === "en" ? "en" : "zh";
  var isMac = /Macintosh|Mac OS X|Mac_PowerPC/i.test(navigator.userAgent) || /Mac/i.test(navigator.platform || "");
  var isWindows = /Windows/i.test(navigator.userAgent) || /Win/i.test(navigator.platform || "");
  var platform = isMac ? "macos" : isWindows ? "windows" : "other";
  var dataUrl = new URL("platform-releases.json", document.currentScript && document.currentScript.src || location.href);

  function render(data) {
    var item = data[platform];
    var copy = lang === "en" ? {
      detected: platform === "other" ? "Your platform" : "Detected platform",
      other: "Choose a package from the download list",
      recommended: "Recommended for this device",
      version: "Version",
      setup: "Download installer",
      portable: "Portable",
      universal: "Universal DMG",
      arm64: "Apple Silicon",
      x64: "Intel Mac",
      note: "The page detected your browser platform and selected the matching release.",
    } : {
      detected: platform === "other" ? "当前平台" : "检测到平台",
      other: "请从下载列表选择对应安装包",
      recommended: "适合此设备的版本",
      version: "版本",
      setup: "下载安装包",
      portable: "便携版",
      universal: "通用 DMG",
      arm64: "Apple 芯片",
      x64: "Intel Mac",
      note: "页面已根据浏览器平台自动选择匹配版本。",
    };
    root.className = "platform-recommendation" + (platform === "other" ? " is-neutral" : "");
    if (!item) {
      root.innerHTML = "<strong>" + copy.detected + "</strong><span>" + copy.other + "</span>";
      return;
    }
    var links = [];
    if (platform === "windows") {
      links.push('<a class="btn btn-primary" href="' + item.setup + '">' + copy.setup + '</a>');
      links.push('<a class="btn btn-ghost" href="' + item.portable + '">' + copy.portable + '</a>');
    } else {
      links.push('<a class="btn btn-primary" href="' + item.universal + '">' + copy.universal + '</a>');
      links.push('<a class="btn btn-ghost" href="' + item.arm64 + '">' + copy.arm64 + '</a>');
      links.push('<a class="btn btn-ghost" href="' + item.x64 + '">' + copy.x64 + '</a>');
    }
    root.innerHTML =
      '<div class="platform-recommendation-copy"><span class="eyebrow">' + copy.recommended + '</span>' +
      '<strong>' + item.label + ' · ' + copy.version + ' ' + item.version + '</strong>' +
      '<small>' + copy.note + '</small></div>' +
      '<div class="platform-recommendation-actions">' + links.join("") + '</div>';
  }

  fetch(dataUrl, { cache: "no-cache" })
    .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
    .then(render)
    .catch(function () {
      root.className = "platform-recommendation is-neutral";
      root.textContent = lang === "en" ? "Open Download to choose a package." : "请打开下载页选择安装包。";
    });
})();
