# Changelog

## [0.2.37] - 2026-08-17

### Fixed

- Taskbar clicks no longer hide the window into the tray; minimize follows Windows defaults, while close can still tray-minimize.
- After in-app update install, relaunch from the registry install location and prefer an exe whose version matches the update.
- Automatically refresh quota once after Cursor JSON / token / local import.

## [0.2.36] - 2026-08-17

### Fixed

- Rebuild the Windows package so frontend assets are embedded; fixes startup `asset not found: index.html` from 0.2.35.
- Tolerate a UTF-8 BOM in the update manifest to avoid `UPDATE_MANIFEST_PARSE_FAILED`.

## [0.2.35] - 2026-08-17

### Fixed

- Allow importing token JSON without email, including `cursor-token-lite/v1` dumps.
- Use `{auth_id}@cursor.imported` as a placeholder until a later quota refresh fills the real email.
- Surface the real JSON parser error instead of a generic “unable to parse JSON” message.

## [0.2.34] - 2026-08-16

### Fixed

- In-app updates now download and verify the full NSIS installer; reject bootstrap-sized artifacts that only restarted the old binary.
- Do not relaunch the previous executable after a failed install; prefer the installed app path after success.
- Add a short cooldown after automatic update failures, plus skip-this-version controls.
- Account inject writes `authId` / `cachedSignUpType` and clears a missing refresh token.
- TokenKeeper no longer hot-writes Cursor `state.vscdb` while Cursor is running.
- Launch update checks honor the external-network switch and check interval.
- Wrap account-detail encryption keys with DPAPI on Windows; export redacts secrets unless confirmed.

## [0.2.33] - 2026-08-16

### Changed

- Remove Screenshot demo data from release builds (debug-only marketing helper).
- Make Automatic download and update a dedicated Settings section with explicit toggle buttons.

## [0.2.32] - 2026-08-16

### Changed

- Promote Automatic download and update to a dedicated Settings card above Application updates so the opt-in control is easier to find.

## [0.2.31] - 2026-08-16

### Changed

- On launch, only check for a newer version and remind by default; the launch dialog no longer downloads the installer.
- Add an Automatic download and update toggle in Settings (off by default). Auto OTA runs at launch only when this is enabled.
- When auto-update is off, the reminder points users to Settings for a manual check and install.

## [0.2.30] - 2026-08-15

### Added

- Add a Screenshot demo data toggle in Settings: fill the UI with sample accounts, invoices, and sessions for public screenshots without rewriting on-disk Cursor account files; turning it off restores the in-app cache.
- Show cumulative GitHub Releases installer download counts on the project download page, including per-release totals.
- Sync a downloads badge on the GitHub profile README and repository README.

### Notes

- No in-app usage telemetry in this release. If analytics are added later, they will be off by default and require an explicit opt-in.

## [0.2.29] - 2026-08-15

### Added

- Add an Author & Support dialog for Warrior Ma with a local GitHub QR code and direct profile, project Star, and support actions.
- Add official repository, issue tracker, Sponsor, and project support metadata for `WarriorLago/CursorAccountCockpit`.

### Changed

- Keep the author dialog focused on Warrior Ma and Cursor Account Cockpit by removing the visible upstream-source attribution panel from the application UI.
- Preserve upstream attribution in public source documentation and `NOTICE.md` instead of displaying it inside the product.
- Use GitHub Releases as the public update channel, with bilingual repository docs plus Release and project-site entry points.


## [0.2.26] - 2026-08-15

### Fixed

- Keep long Cursor quota reset times compact with an ellipsis while showing the complete reset time in a hover and keyboard-focus tooltip.
- Move the tooltip layer outside the clipped text element so it remains fully visible above the quota card.

## [0.2.25] - 2026-08-14

### Changed

- Display Cursor accounts in three columns at standard desktop widths, with responsive two- and one-column fallbacks for narrower windows.
- Reduce account card width, height, padding, spacing, badges, quota tiles, notes, and action controls for a denser account-management view.

## [0.2.24] - 2026-08-14

### Changed

- Redesigned Settings with compact cards that place window behavior, invoice export concurrency, and language side by side on desktop widths.
- Reduced card, icon, control, button, spacing, and shadow sizes to eliminate oversized empty areas.
- Added responsive three-, two-, and one-column layouts for standard and minimum window widths.

## [0.2.23] - 2026-08-14

### Added

- Add a Window and Tray setting that controls whether the Close button sends the main window to the system tray or exits the application.

### Improved

- Always send the main window to the tray when its Minimize button is clicked; clicking the tray icon restores the window.
- Treat both new installations and the legacy Ask preference as Close to Tray by default, while the tray Quit action still exits completely.


## [0.2.22] - 2026-08-14

### Added

- Add a Cursor Session Manager that reads local Agent sessions and shows main/subagent type, project, message totals, model, last update, and local size.
- Search session titles, projects, IDs, and conversation text; optionally show subagent sessions and select visible or individual sessions.
- Export selected sessions into one Markdown document, optionally include tool-call details, and open the session or transcript source folder directly.

### Improved

- Enrich titles, project paths, models, and status from Cursor's global SQLite metadata while streaming conversation text from local JSONL transcripts.
- Open Cursor session storage read-only; listing and exporting leave Cursor databases, transcript files, and account credentials untouched.

## [0.2.21] - 2026-08-14

### Fixed

- Fixed the upper half of the billing dialog close button being intercepted by the 46px title-bar drag layer.
- Restored the Windows root-container marker and explicitly made the full 48×48px close target a non-drag click region.

## [0.2.20] - 2026-08-14

### Fixed

- Fix installer downloads stopping around 31%–40% with `UPDATE_DOWNLOAD_STREAM_FAILED` after the previous 30-second request timeout elapsed.

### Improved

- Extend the update download timeout to 20 minutes and request the original response encoding to keep installer transfers stable.
- Retry interrupted downloads up to eight times, resume from the existing byte offset with HTTP Range, and show a resuming status in the interface.
- Publish a small update bootstrap for the v0.2.18/v0.2.19 downloader so existing installations can complete this upgrade on slower connections.

## [0.2.19] - 2026-08-14

### Added

- Check for updates immediately on every launch and show an update prompt with Update Now and Remind Me Later actions when a newer version is available.
- Show release notes, installer verification state, and live download progress in the startup update prompt before automatic installation and relaunch.

### Improved

- Hide the concrete update endpoint from the interface and normalize network errors so internal update-service details are not exposed to regular users.
- Expand the Cursor official billing modal close target to 48×48 pixels and keep it available while exports are running.
- Increase the default billing export concurrency from 3 to 5 while retaining the 1–10 setting range.

## [0.2.18] - 2026-08-14

### Added

- Added parallel downloads for Cursor official invoice and receipt batch exports. The default is 3 concurrent tasks, configurable from 1–10 in Settings.
- Added a real-time export progress bar showing completed and total files, percentage, success and failure counts, effective concurrency, and the latest completed item.
- Added an in-app update channel with automatic startup checks plus manual version, release notes, download, and install controls in Settings.
- Added live installer download progress, size and SHA-256 verification, followed by automatic exit, silent installation, and relaunch.

### Improved

- Parallel jobs retain per-file retries and still generate per-account line items, per-account totals, and the grand billing total after all tasks finish.

## [0.2.17] - 2026-08-14

### Fixed

- Detect Cursor through running processes, Program Files system installations, and PATH command entries, including `C:\Program Files\cursor\Cursor.exe`.
- Re-detect and replace stale saved Cursor paths so account switching no longer reports `APP_PATH_NOT_FOUND:cursor`.

### Improved

- Add Cursor launch and account switching as the first card on the active Settings page, with visible detection state plus save, auto-detect, and manual selection controls.

## [0.2.16] - 2026-08-14

### Added

- Turn invoice status totals into multi-select buttons so Paid, Uncollectible, Void, Open, and Draft directly control both the list and batch export scope.

### Improved

- Select Paid only by default; Void and every other status are included only after an explicit selection.
- Update the detailed invoice list, scheduled PDF count, and account count immediately when status selections change.
- Show the active status scope directly in the batch export action, such as “Paid invoices only” or “Includes Paid + Uncollectible invoices.”

## [0.2.15] - 2026-08-14

### Added

- Detect and save the Cursor installation path when settings are first loaded, then reuse the saved path without rescanning.

### Fixed

- Fully close the old Cursor process before injecting the selected account and automatically restarting Cursor so the new session takes effect immediately.

### Improved

- Label the path field as “Cursor installation path” in Settings and Quick Settings, with clear auto-detection and restart guidance.

## [0.2.14] - 2026-08-13

### Improved

- Enlarge the Cursor official invoice and receipt dialog to use nearly the full window.
- Compact the dialog controls and invoice rows so the bill list shows about three to four records at once on common desktop screens.

## [0.2.13] - 2026-08-13

### Fixed

- Restore an explicit “Select all months” action for cross-month and cross-year bill exports.
- Query Cursor quota through the current Cursor CLI session request first, using the CLI user agent, while retaining the Bearer Connect endpoint as a fallback.

### Improved

- Show separate counts for paid, uncollectible, void, open, draft, and other invoices in the selected export range.
- Show the exact number of bills included after toggling uncollectible invoice export.

## [0.2.12] - 2026-08-13

### Added

- Add local notes for Cursor accounts, including edit, clear, card preview, and list preview support.

### Fixed

- Prefer the `api2.cursor.sh` Bearer Connect quota endpoint so valid tokens still refresh when the legacy cookie endpoint returns 401, while retaining the cookie endpoint as a fallback.

### Improved

- Make the bill start/end month pickers scrollable so long month lists no longer overflow the screen.
- Add an export option to include or exclude uncollectible invoices (off by default).
- Restructure `导出统计.txt` to list each invoice per account, then per-account totals, then the grand total.

## [0.2.11] - 2026-08-12

### Added

- Add start-month and end-month selectors for custom multi-month invoice and receipt exports.
- Support single-month, two-month, three-month, longer, and cross-year ranges.
- Name export folders and TXT reports with the selected month range.

## [0.2.10] - 2026-08-12

### Improved

- Keep only the primary Official Invoice and Official Receipt buttons in the account toolbar.
- Remove the duplicate batch invoice and receipt buttons from the selection toolbar.
- Preserve selected-account counts and batch export behavior through the primary buttons.

## [0.2.9] - 2026-08-12

### Improved

- Fit the Cursor account list into the available window width without horizontal scrolling.
- Reduce table row padding, action sizes, quota spacing, and redundant minimum widths.
- Arrange Auto/Composer, API, and on-demand usage side by side in each compact row.
- Add complete hover text for shortened account, authorization, plan, tag, quota, reset, and cost values.

## [0.2.8] - 2026-08-12

### Improved

- Refine Cursor account cards with more balanced spacing and clearer quota tiles.
- Show complete account, authorization, plan, tag, quota, reset, and cost text in hover tips.
- Let quota labels wrap naturally instead of shortening important text with ellipses.
- Preserve the compact two-column quota layout and narrow-window responsiveness.

## [0.2.7] - 2026-08-12

### Improved

- Reduce Cursor account card padding, spacing, badges, and footer action sizes.
- Arrange quota details in a compact two-column grid while preserving every usage item.
- Stop cards in the same row from stretching to the height of the tallest account.
- Keep a single-column responsive layout for narrow windows.

## [0.2.6] - 2026-08-12

### Improved

- Expand the official Cursor billing dialog to make better use of large windows.
- Increase the width and height of account/month selectors and the refresh action.
- Add a dedicated invoice-details section with item count, a larger viewport, and clearer scrolling.
- Use compact horizontal invoice actions on wide screens while improving narrow and short-window layouts.

## [0.2.5] - 2026-08-12

### Added

- Retry Stripe PDF downloads up to four times for transient TLS, connection, timeout, and retryable HTTP failures.
- Export flat PDFs into an automatically named monthly folder, adding a numbered suffix when the folder already exists.
- Write an export report TXT with totals, successes, failures, item details, per-account amounts, and grand totals.
- Keep a completion result in the dialog until the user closes it.

## [0.2.4] - 2026-08-12

### Added

- Added official Cursor/Stripe invoice and receipt PDF downloads for one, selected, or all accounts.
- Invoice files now use `account-email-YYYY-MM-DD.pdf`; exports only ask for a destination folder.

### Fixed

- The native title-bar close button now exits the desktop process directly.

## [0.2.3] - 2026-08-11

### Fixed

- Fixed the main window close button being intercepted by a removed legacy confirmation dialog.
- Closing the main window now hides it to the tray; Quit remains available from the tray menu.

## [0.2.2] - 2026-08-11

### Changed

- Added a runtime version badge to the main account page.
- Removed the compact tray explanation card from Settings.

## [0.2.1] - 2026-08-11

### Fixed

- Granted a narrowly scoped Tauri filesystem permission and save monthly bills directly to the user's Downloads folder.
- Restored a high-contrast selected state for the sidebar navigation so active labels remain readable.

## [0.2.0] - 2026-08-11

### Changed

- Reduced the tray to Show main window, Settings, and Quit.
- Made Simplified Chinese the default interface language.
- Added a compact Settings page for Chinese and English language switching.
- Removed provider shortcuts, generic quick settings, the manual entry, and the multi-instance page from the product UI.
- Removed unused provider menu resources from the desktop bundle.

## [0.1.1] - 2026-08-11

### Fixed

- Embedded the production frontend through Tauri's custom protocol so packaged builds no longer depend on localhost.
- Replaced the application icon with a new icon.

## [0.1.0] - 2026-08-11

### Cursor Account Cockpit by Warrior Ma

- Reworked the desktop shell into a Cursor-focused account and quota manager.
- Added account/month selection for Cursor usage bill downloads.
- Added paginated usage-event retrieval and UTF-8 CSV bill generation.
- Added derivative-project attribution and CC BY-NC-SA 4.0 license files.
- Removed the upstream updater endpoint and build-time CLIProxy sidecar dependency.
