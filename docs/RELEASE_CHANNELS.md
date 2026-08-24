# 发布渠道 / Release channels

项目按平台独立维护版本号：

| 平台 | 当前版本 | 推荐下载 |
| --- | --- | --- |
| Windows x64 | `0.2.41` | [安装包](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/Cursor-Account-Cockpit-0.2.41-x64-setup.exe) · [便携版](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/Cursor-Account-Cockpit-0.2.41-portable.exe) |
| macOS 通用版 | `2.0.1` | [Universal DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/Cursor-Account-Cockpit-2.0.1-macos-universal.dmg) |
| macOS Apple 芯片 | `2.0.1` | [arm64 DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/Cursor-Account-Cockpit-2.0.1-macos-arm64.dmg) |
| macOS Intel | `2.0.1` | [x64 DMG](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/Cursor-Account-Cockpit-2.0.1-macos-x64.dmg) |

## macOS 兼容范围

| Mac 系列 | 安装包 | 系统范围 | 构建目标 |
| --- | --- | --- | --- |
| M1 / M2 / M3 / M4 / M5 | Apple Silicon 或 Universal DMG | macOS 11 及以上 | `aarch64-apple-darwin`，最低系统 `11.0` |
| Intel Mac（Big Sur 及以上） | Universal DMG | macOS 11 及以上 | `x86_64 + arm64`，最低系统 `11.0` |
| Intel Mac（Catalina） | Intel x64 DMG | macOS 10.15 及以上 | `x86_64-apple-darwin`，最低系统 `10.15` |

正式构建固定使用 macOS 15 构建环境，避免跟随 `macos-latest` 自动升级 SDK。每个包发布前执行 `scripts/release/verify_macos_bundle.sh`，检查 Info.plist 最低系统、Mach-O 架构、所有内置可执行文件架构、代码签名和启动存活测试。

下载站点：<https://warriorlago.github.io/CursorAccountCockpit/>

站点会读取浏览器的操作系统标识，在首页和下载页显示“适合此设备的版本”，并提供对应安装包按钮。浏览器识别只用于推荐下载，不会读取本机应用版本或账号数据。

## OTA 清单

- Windows 私有清单：`http://111.228.42.16/cursor-account-cockpit/updates/windows/latest.json`
- macOS 私有清单：`http://111.228.42.16/cursor-account-cockpit/updates/macos/latest.json`
- GitHub Windows 兼容清单：[latest.json](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/latest.json)
- GitHub macOS 平台清单：[macos-latest.json](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.41/macos-latest.json)

GitHub Release `v0.2.41` 同时承载 Windows `0.2.41` 和 macOS `2.0.1` 的安装附件；应用端更新地址仍按各平台构建配置选择对应清单。
