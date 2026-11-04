(function () {
  var API = "https://api.github.com/repos/WarriorLago/CursorAccountCockpit/releases?per_page=20";
  var root = document.getElementById("release-list");
  if (!root) return;

  var lang = root.getAttribute("data-lang") || "zh";
  var copy = lang === "en"
    ? {
        loading: "Loading releases from GitHub…",
        fail: "Could not load the release list. Open GitHub Releases instead.",
        open: "Open on GitHub",
        empty: "No downloadable assets for this release.",
        sourceOnly: "No installer in this release.",
        published: "Published",
        totalDownloads: "Total installer downloads:",
        downloads: "downloads",
      }
    : {
        loading: "正在从 GitHub 拉取可下载文件…",
        fail: "无法自动拉取版本列表，请改从 GitHub Releases 下载。",
        open: "在 GitHub 打开",
        empty: "该版本没有可下载附件。",
        sourceOnly: "此版本没有安装包。",
        published: "发布于",
        totalDownloads: "安装包累计",
        downloads: "次下载",
      };

  root.innerHTML = '<p class="status">' + copy.loading + "</p>";

  function isWindowsInstaller(name) {
    var n = name.toLowerCase();
    return (
      (n.endsWith(".exe") || n.endsWith(".msi")) &&
      (n.indexOf("setup") >= 0 || n.indexOf("portable") >= 0 || n.indexOf("msi") >= 0)
    );
  }

  function isMacInstaller(name) {
    return name.toLowerCase().endsWith(".dmg");
  }

  function isInstaller(name) {
    return isWindowsInstaller(name) || isMacInstaller(name);
  }

  function isChecksum(name) {
    return name.toLowerCase().indexOf("sha256sums") >= 0;
  }

  /** Update manifests and signatures are for the app, not for people. */
  function isMachineFile(name) {
    var n = name.toLowerCase();
    return n.endsWith(".json") || n.endsWith(".sig") || n.endsWith(".blockmap");
  }

  function isSource(name) {
    var n = name.toLowerCase();
    return n.indexOf("source") >= 0 && n.endsWith(".zip");
  }

  function rank(name) {
    if (isWindowsInstaller(name) && name.toLowerCase().indexOf("setup") >= 0) return 0;
    if (isWindowsInstaller(name) && name.toLowerCase().indexOf("portable") >= 0) return 1;
    if (isWindowsInstaller(name)) return 2;
    if (isMacInstaller(name) && name.toLowerCase().indexOf("universal") >= 0) return 2;
    if (isMacInstaller(name)) return 3;
    if (isChecksum(name)) return 4;
    return 5;
  }

  function labelFor(name) {
    var n = name.toLowerCase();
    if (n.indexOf("setup") >= 0 && n.endsWith(".exe")) return lang === "en" ? "Windows Setup" : "Windows 安装包";
    if (n.indexOf("portable") >= 0) return lang === "en" ? "Windows Portable" : "Windows 便携版";
    if (n.endsWith(".msi")) return "Windows MSI";
    if (isSource(name)) return lang === "en" ? "Source ZIP" : "源码 ZIP";
    if (n.indexOf("universal") >= 0 && isMacInstaller(name)) return lang === "en" ? "macOS Universal" : "macOS 通用版";
    if (n.indexOf("arm64") >= 0 && isMacInstaller(name)) return lang === "en" ? "macOS Apple Silicon" : "macOS Apple 芯片";
    if (isMacInstaller(name)) return "macOS Intel";
    if (isChecksum(name)) return "SHA-256";
    return name;
  }

  fetch(API, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (releases) {
      if (!Array.isArray(releases) || !releases.length) throw new Error("empty");
      root.innerHTML = "";

      var totalInstallerDownloads = 0;
      releases.forEach(function (rel) {
        (rel.assets || []).forEach(function (asset) {
          if (isInstaller(asset.name)) {
            totalInstallerDownloads += asset.download_count || 0;
          }
        });
      });
      var summary = document.getElementById("download-stats");
      if (summary) {
        summary.textContent =
          copy.totalDownloads + " " + totalInstallerDownloads.toLocaleString() + " " + copy.downloads;
      }

      // Windows and macOS version independently, so each has its own newest release.
      var newestSeen = {};
      releases.forEach(function (rel) {
        var assets = (rel.assets || [])
          .filter(function (a) { return !isSource(a.name) && !isMachineFile(a.name); })
          .slice()
          .sort(function (a, b) {
          return rank(a.name) - rank(b.name);
        });
        var card = document.createElement("article");
        card.className = "release-card";

        var header = document.createElement("header");
        var title = document.createElement("h3");
        title.textContent = rel.tag_name || rel.name || "release";
        var platform = assets.some(function (a) { return isMacInstaller(a.name); }) ? "macOS" : assets.some(function (a) { return isWindowsInstaller(a.name); }) ? "Windows" : "";
        if (platform && !newestSeen[platform]) {
          newestSeen[platform] = true;
          title.textContent += lang === "en" ? " · Latest " + platform : " · 最新 " + platform;
        }
        var meta = document.createElement("div");
        meta.className = "meta";
        var when = rel.published_at ? new Date(rel.published_at).toISOString().slice(0, 10) : "";
        var relDownloads = 0;
        assets.forEach(function (asset) {
          if (isInstaller(asset.name)) relDownloads += asset.download_count || 0;
        });
        meta.textContent =
          (when ? copy.published + " " + when : "") +
          (relDownloads ? (when ? " · " : "") + relDownloads.toLocaleString() + " " + copy.downloads : "");
        header.appendChild(title);
        header.appendChild(meta);
        card.appendChild(header);

        if (!assets.length) {
          var empty = document.createElement("p");
          empty.className = "note";
          empty.textContent = copy.empty;
          card.appendChild(empty);
        } else {
          var links = document.createElement("div");
          links.className = "asset-links";
          var hasInstaller = false;
          assets.forEach(function (asset, i) {
            if (!asset.browser_download_url) return;
            if (isInstaller(asset.name)) hasInstaller = true;
            var a = document.createElement("a");
            a.href = asset.browser_download_url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.textContent = labelFor(asset.name);
            a.title = asset.name;
            if (i === 0 || (isWindowsInstaller(asset.name) && asset.name.toLowerCase().indexOf("setup") >= 0)) {
              a.className = "primary";
            }
            links.appendChild(a);
          });
          var open = document.createElement("a");
          open.href = rel.html_url;
          open.target = "_blank";
          open.rel = "noopener noreferrer";
          open.textContent = copy.open;
          links.appendChild(open);
          card.appendChild(links);

          if (!hasInstaller) {
            var note = document.createElement("p");
            note.className = "note";
            note.textContent = copy.sourceOnly;
            card.appendChild(note);
          }
        }

        root.appendChild(card);
      });
    })
    .catch(function () {
      root.innerHTML =
        '<p class="status">' +
        copy.fail +
        ' <a href="https://github.com/WarriorLago/CursorAccountCockpit/releases/latest">' +
        copy.open +
        "</a></p>";
    });
})();
