# 发布渠道 / Release channels

项目按平台独立维护版本号：

| 平台 | 当前版本 | 推荐下载 |
| --- | --- | --- |
| Windows x64 | `0.2.43` | [安装包](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.43/Cursor-Account-Cockpit-0.2.43-x64-setup.exe) · [便携版](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.43/Cursor-Account-Cockpit-0.2.43-portable.exe) |
| macOS 通用版 | `2.0.5` | [Universal DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.5/Cursor-Account-Cockpit-2.0.5-macos-universal.dmg) |
| macOS Apple 芯片 | `2.0.5` | [arm64 DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.5/Cursor-Account-Cockpit-2.0.5-macos-arm64.dmg) |
| macOS Intel | `2.0.5` | [x64 DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.5/Cursor-Account-Cockpit-2.0.5-macos-x64.dmg) |

## macOS 兼容范围

| Mac 系列 | 安装包 | 系统范围 | 构建目标 |
| --- | --- | --- | --- |
| M1 / M2 / M3 / M4 / M5 | Apple Silicon 或 Universal DMG | macOS 11 及以上 | `aarch64-apple-darwin`，最低系统 `11.0` |
| Intel Mac（Big Sur 及以上） | Universal DMG | macOS 11 及以上 | `x86_64 + arm64`，最低系统 `11.0` |
| Intel Mac（Catalina） | Intel x64 DMG | macOS 10.15 及以上 | `x86_64-apple-darwin`，最低系统 `10.15` |

正式构建固定使用 macOS 15 构建环境，避免跟随 `macos-latest` 自动升级 SDK。每个包发布前执行 `scripts/release/verify_macos_bundle.sh`，检查 Info.plist 最低系统、Mach-O 架构、所有内置可执行文件架构和代码签名；构建环境允许时还会执行启动存活测试。未配置 Apple Developer ID 时，工作流对完整 `.app` 执行 ad-hoc 重签并重新封装 DMG；面向公开分发的 Apple 信任提示需要 Developer ID 签名与公证票据。

下载站点：<https://warriorlago.github.io/CursorAccountCockpit/>

站点会读取浏览器的操作系统标识，在首页和下载页显示“适合此设备的版本”，并提供对应安装包按钮。浏览器识别只用于推荐下载，不会读取本机应用版本或账号数据。

## OTA 清单

- GitHub Windows 清单：[latest.json](https://github.com/WarriorLago/CursorAccountCockpit/releases/latest/download/latest.json)
- GitHub macOS 稳定通道：[latest.json](https://warriorlago.github.io/CursorAccountCockpit/updates/macos/latest.json)
- GitHub macOS Release 附件：[macos-latest.json](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.5/macos-latest.json)

Windows 与 macOS 使用独立版本号及独立清单。macOS 客户端访问固定 HTTPS 通道地址，通道文件再指向最新的版本化 Release 附件；Apple Silicon、Intel 构建优先读取 `darwin-aarch64-app` / `darwin-x86_64-app`，缺失时回退到 `macos-universal-dmg`。清单请求失败时再尝试 GitHub Pages 与 GitHub raw 镜像。

Windows `0.2.43` 发布在 GitHub Release `v0.2.43` 并标记为 Latest；macOS `2.0.5` 使用独立 Release `v2.0.5`。两个平台不共享版本号或 `latest.json`。
