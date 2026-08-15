<p align="center">
  <a href="./README.md">简体中文</a> · <strong>English</strong>
</p>

<p align="center">
  <img src="./assets/potato.svg" alt="Cursor Account Cockpit" width="96" height="96">
</p>

<h1 align="center">Cursor Account Cockpit</h1>

<p align="center">
  A Cursor-focused local desktop console for multi-account management, quota monitoring, one-click switching, session browsing, and official invoice / receipt export.
</p>

<p align="center">
  <a href="https://github.com/WarriorLago/CursorAccountCockpit/releases/latest"><img alt="Latest release" src="https://img.shields.io/github/v/release/WarriorLago/CursorAccountCockpit?label=release&color=2ea44f"></a>
  <a href="https://github.com/WarriorLago/CursorAccountCockpit/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/WarriorLago/CursorAccountCockpit/total?label=downloads&color=0e8a16"></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey"></a>
  <a href="https://github.com/WarriorLago/CursorAccountCockpit/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/WarriorLago/CursorAccountCockpit?style=social"></a>
</p>

<p align="center">
  <a href="https://github.com/WarriorLago/CursorAccountCockpit/releases/latest"><strong>Download 0.2.32</strong></a>
  ·
  <a href="https://github.com/WarriorLago/CursorAccountCockpit/releases">All releases</a>
  ·
  <a href="./CHANGELOG.md">Changelog</a>
  ·
  <a href="./docs/SUPPORT.en.md">Support</a>
  ·
  <a href="https://warriorlago.github.io/CursorAccountCockpit/en/">Project site</a>
  ·
  <a href="https://warriorlago.github.io/CursorAccountCockpit/en/features.html">Features</a>
</p>

<p align="center">
  <img src="./docs/images/accounts.png" alt="Accounts and quota overview" width="920">
</p>

## What it is

Cursor Account Cockpit is a **Windows desktop app** built around real Cursor multi-account workflows. In one window you can:

- Manage multiple Cursor accounts
- Monitor Total / Auto / API / On-Demand usage
- Switch accounts and restart Cursor in one click
- Export official invoices and receipts by month
- Browse local Agent sessions read-only and export Markdown

Credentials stay on your machine. Quota and billing requests go to official Cursor domains only.

## Latest release 0.2.32

Download only from this repo’s official Release assets (direct links):

| File | Description |
| --- | --- |
| [Cursor-Account-Cockpit-0.2.32-x64-setup.exe](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.32/Cursor-Account-Cockpit-0.2.32-x64-setup.exe) | Windows x64 installer |
| [Cursor-Account-Cockpit-0.2.32-portable.exe](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.32/Cursor-Account-Cockpit-0.2.32-portable.exe) | Windows x64 portable build |
| [SHA256SUMS.txt](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.32/SHA256SUMS.txt) | SHA-256 checksums |
| [latest.json](https://github.com/WarriorLago/CursorAccountCockpit/releases/download/v0.2.32/latest.json) | In-app update manifest |

More versions: [project download page](https://warriorlago.github.io/CursorAccountCockpit/en/download.html) or [GitHub Releases](https://github.com/WarriorLago/CursorAccountCockpit/releases). Some older tags are source-only.

---

## Features in detail

### 1. Accounts & quota overview

<p align="center">
  <img src="./docs/images/accounts.png" alt="Account list view: email, plan, usage, and actions on one row" width="920">
</p>

<p align="center">
  <img src="./docs/images/accounts-cards.png" alt="Account card view with plan badges and usage bars" width="920">
</p>

The home page supports **list** and **card** layouts. Prefer the list on wide windows so email, plan, usage, and actions stay on one complete row; use cards for a quick visual scan.

Day-to-day capabilities:

- **Search / filter / sort** by email, plan, tags, or creation time
- **Plan badges** for FREE, PRO, PRO+, ULTRA, trial, and more
- **Quota visuals** for total usage, Auto + Composer, API usage, and On-Demand
- **Billing-cycle reset time** with full tooltip on hover / focus
- **Tags and notes** for organizing accounts locally
- **Bulk actions** for select-all, export, and delete

Quick actions: switch into Cursor, open billing, edit tags / notes, refresh quota, export, delete.

### 2. Multiple ways to add accounts

<p align="center">
  <img src="./docs/images/add-account.png" alt="Add account: OAuth / Token / local import" width="720">
</p>

“Add account” supports three import paths:

| Method | Best for |
| --- | --- |
| **OAuth** | Browser-based official login |
| **Token / JSON** | Pasting Access Token (JWT) or exported JSON, including batch import |
| **Local import** | Reading the currently signed-in Cursor session on this machine |

<p align="center">
  <img src="./docs/images/token-import.png" alt="Token / JSON import panel" width="720">
</p>

Token / JSON import supports:

- Single JWT paste
- JSON object / array batch import
- Expandable required-field examples

### 3. One-click account switching

When you click “Switch to Cursor”, the app:

1. Writes the selected account into local Cursor auth storage
2. Closes the previous Cursor process
3. Relaunches Cursor from the path configured in Settings

The new session takes effect immediately without manual re-login.

### 4. Official invoices & receipts

<p align="center">
  <img src="./docs/images/billing.png" alt="Official billing export panel" width="920">
</p>

For month-end review or cost allocation, open **Official Invoice / Official Receipt** from the toolbar, or jump into billing from an account row:

1. **Pick accounts** — one or more saved accounts (isolated per account)
2. **Pick months** — start/end month, including cross-month and cross-year ranges
3. **Filter status** — Paid, Uncollectible, Void, Open, Draft, and more
4. **Export PDFs** — batch-download official invoice/receipt PDFs (default 5-way concurrency; settings allow 1–10)
5. **Export usage CSV** — model, cost, tokens, charge status, user ID, team ID, and related fields

Everything is written to a local folder you choose, plus a summary text for success/failure counts. Do not post sensitive billing fields publicly.

### 5. Local session manager (read-only)

<p align="center">
  <img src="./docs/images/sessions.png" alt="Cursor session manager" width="920">
</p>

Session Manager reads local Cursor Agent sessions without modifying them:

- Shows main / subagent type, project path, message count, model, updated time, and local size
- Full-text search across title, project, session ID, and conversation body
- Optional subagent sessions
- Multi-select Markdown export, with optional tool-call details
- Open session folders or the local transcript root directly

It never rewrites Cursor databases, transcript files, or credentials.

### 6. Settings: path, tray, language, updates

<p align="center">
  <img src="./docs/images/settings.png" alt="Settings page" width="920">
</p>

Settings covers day-to-day operations:

- **Cursor launch & switching**: auto-detect / manually pick `Cursor.exe`
- **Window & tray**: close to tray or quit; minimize always goes to tray
- **Billing export concurrency**: 1–10, default 5
- **Language**: Simplified Chinese by default, English available
- **App updates**: startup + manual checks, integrity verification, silent install and relaunch

---

## Requirements

- Windows 10 / 11 x64
- [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)
- Development: Node.js 20+, Rust stable

## Install & use

1. Download the installer or portable build from [Releases](https://github.com/WarriorLago/CursorAccountCockpit/releases/latest)
2. Confirm the Cursor install path in Settings
3. Add accounts via OAuth / Token / local import
4. Refresh quotas and switch accounts when needed
5. Export invoices, receipts, or session Markdown as required

## Development

```powershell
git clone https://github.com/WarriorLago/CursorAccountCockpit.git
cd CursorAccountCockpit
npm install
npm run typecheck
npm run tauri:dev
```

Build the installer:

```powershell
npm run build
npx tauri build --bundles nsis
```

## Data & privacy

- Account index and credentials live in `~/.cursor_account_cockpit`
- Local import only reads Cursor login-state storage
- Quota and billing requests go to official Cursor domains
- Update manifests and installers come from this repository’s GitHub Releases
- Account tokens are never intended to be committed or uploaded with source archives

## Author & contact

Maintained by **Warrior Ma**. For questions or collaboration, **WeChat is preferred**:

<p align="center">
  <img src="./docs/images/wechat.png" alt="WeChat contact QR code" width="240">
</p>

- WeChat: scan the QR code above
- Email: [warriorlago@163.com](mailto:warriorlago@163.com)
- [GitHub profile](https://github.com/WarriorLago)
- [Project repository](https://github.com/WarriorLago/CursorAccountCockpit)
- [Support notes](./docs/SUPPORT.en.md)

The in-app Author & Support dialog also links to GitHub, Star, and support.

## Open Source & License

Thanks to [jlcodes99/cockpit-tools](https://github.com/jlcodes99/cockpit-tools) for the open-source foundation. This project continues from that work; see `NOTICE.md` for details.

Released under **CC BY-NC-SA 4.0**: attribution required, non-commercial use, share-alike. See `LICENSE`.
