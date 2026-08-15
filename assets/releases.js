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
        sourceOnly: "No Windows installer in this release.",
        published: "Published",
        totalDownloads: "Total installer downloads",
        downloads: "downloads",
      }
    : {
        loading: "正在从 GitHub 拉取可下载文件…",
        fail: "无法自动拉取版本列表，请改从 GitHub Releases 下载。",
        open: "在 GitHub 打开",
        empty: "该版本没有可下载附件。",
        sourceOnly: "此版本没有 Windows 安装包。",
        published: "发布于",
        totalDownloads: "安装包累计下载",
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

  function isChecksumOrMeta(name) {
    var n = name.toLowerCase();
    return n === "sha256sums.txt" || n === "latest.json";
  }

  function isSource(name) {
    var n = name.toLowerCase();
    return n.indexOf("source") >= 0 && n.endsWith(".zip");
  }

  function rank(name) {
    if (isWindowsInstaller(name) && name.toLowerCase().indexOf("setup") >= 0) return 0;
    if (isWindowsInstaller(name) && name.toLowerCase().indexOf("portable") >= 0) return 1;
    if (isWindowsInstaller(name)) return 2;
    if (isSource(name)) return 3;
    if (isChecksumOrMeta(name)) return 4;
    return 5;
  }

  function labelFor(name) {
    var n = name.toLowerCase();
    if (n.indexOf("setup") >= 0 && n.endsWith(".exe")) return lang === "en" ? "Windows Setup" : "Windows 安装包";
    if (n.indexOf("portable") >= 0) return lang === "en" ? "Windows Portable" : "Windows 便携版";
    if (n.endsWith(".msi")) return "Windows MSI";
    if (isSource(name)) return lang === "en" ? "Source ZIP" : "源码 ZIP";
    if (n === "sha256sums.txt") return "SHA-256";
    if (n === "latest.json") return "latest.json";
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
          if (isWindowsInstaller(asset.name)) {
            totalInstallerDownloads += asset.download_count || 0;
          }
        });
      });
      var summary = document.getElementById("download-stats");
      if (summary) {
        summary.textContent =
          copy.totalDownloads + " · " + totalInstallerDownloads.toLocaleString() + " " + copy.downloads;
      }

      releases.forEach(function (rel, index) {
        var assets = (rel.assets || [])
          .filter(function (a) { return !isSource(a.name); })
          .slice()
          .sort(function (a, b) {
          return rank(a.name) - rank(b.name);
        });
        var card = document.createElement("article");
        card.className = "release-card";

        var header = document.createElement("header");
        var title = document.createElement("h3");
        title.textContent = rel.tag_name || rel.name || "release";
        if (index === 0) title.textContent += lang === "en" ? " · Latest" : " · 最新";
        var meta = document.createElement("div");
        meta.className = "meta";
        var when = rel.published_at ? new Date(rel.published_at).toISOString().slice(0, 10) : "";
        var relDownloads = 0;
        assets.forEach(function (asset) {
          if (isWindowsInstaller(asset.name)) relDownloads += asset.download_count || 0;
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
          var hasWin = false;
          assets.forEach(function (asset, i) {
            if (!asset.browser_download_url) return;
            if (isWindowsInstaller(asset.name)) hasWin = true;
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

          if (!hasWin) {
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
