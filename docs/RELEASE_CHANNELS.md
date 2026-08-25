# 发布渠道 / Release channels

项目按平台独立维护版本号：

| 平台 | 当前版本 | 推荐下载 |
| --- | --- | --- |
| Windows x64 | `0.2.41` | [安装包](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/Cursor-Account-Cockpit-0.2.41-x64-setup.exe) · [便携版](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/Cursor-Account-Cockpit-0.2.41-portable.exe) |
| macOS 通用版 | `2.0.2` | [Universal DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.2/Cursor-Account-Cockpit-2.0.2-macos-universal.dmg) |
| macOS Apple 芯片 | `2.0.2` | [arm64 DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.2/Cursor-Account-Cockpit-2.0.2-macos-arm64.dmg) |
| macOS Intel | `2.0.2` | [x64 DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.2/Cursor-Account-Cockpit-2.0.2-macos-x64.dmg) |

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

- Windows 私有清单：`http://111.228.42.16/cursor-account-cockpit/updates/windows/latest.json`
- macOS 私有清单：`http://111.228.42.16/cursor-account-cockpit/updates/macos/latest.json`
- GitHub Windows 兼容清单：[latest.json](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/latest.json)
- GitHub macOS 平台清单：[macos-latest.json](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v2.0.2/macos-latest.json)

Windows `0.2.41` 保留在 GitHub Release `v0.2.41` 并继续标记为 Latest；macOS `2.0.2` 使用独立 Release `v2.0.2`。应用端更新地址按目标平台构建配置选择各自清单，两个平台不共享版本号或 `latest.json`。

macOS `2.0.2` 发布校验记录：GitHub Actions run `32821304264` 三架构成功；Universal、Apple Silicon、Intel DMG 的 SHA-256 依次为 `e93f2c591317a85e10dd027930537479873c994a6bbf560610d2869f572bf0bd`、`1ad69c465c349c6ce8d76b1059c4746df9b71d199a6583b5e52949b83e796b1f`、`5c8b1cc2439f70b31a02a0d78f466a655186bdbc9a1367747d5348f44c438d98`。
