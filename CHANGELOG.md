# Changelog

## Windows [0.2.68] / macOS [2.0.8] - 2026-11-11

- Publish the automatic account refresh and usage authentication fixes on Windows and all three macOS architectures.
- Sync refreshes the account automatically, renews rejected sessions once, and hides stale errors while the operation runs.
- Update bilingual project pages, downloads and independent OTA channels.

## Windows [0.2.67] - 2026-11-11

- Automatically refresh accounts when syncing and renew the session once if the usage endpoint rejects authentication; suppress previous errors while syncing.
- Separate usage-sync authentication failures from account reauthorization; HTTP 403 uses bounded backoff instead of permanently blocking sync.
- Retry usage sync after a newer successful quota refresh, keeping the previous error until usage succeeds.
- Refresh usage insights when account data changes and reject outdated overlapping responses.

## Windows [0.2.66] / macOS [2.0.7] - 2026-11-11

- Keep consecutive API conversation turns on the same account and reuse idle sessions; improve tool calls and Responses continuation.
- Add web search, file access, command execution and working-directory settings. File and command access remain off by default. Support direct connections, system proxies and explicit HTTP proxies, with detected Node.js and Agent paths.
- Preserve unsaved settings during background refresh and show save errors beside the action.
- Remove individual Pelican results with confirmation for successful drawings; skip unavailable models on the original account and allow retries with another account. Improve model catalog matching.
- Include account-pool reconciliation, deduplicated runtime diagnostics, and persistent deletion of every API key, including the default key.
- Fix Windows title-bar overlap and dropdown, scroll and page layouts. macOS retains native controls and ships Apple Silicon, Intel and Universal DMGs.

## Windows [0.2.65] - 2026-11-05

- Allow deleting every API key, including the default, with a visible Delete button and inline confirmation. Deleted keys stay deleted after restart; deleting all keys leaves an explicit empty state. Integration examples, playground and Cursor configuration use the selected remaining key.

## Windows [0.2.64] - 2026-11-05

- Reconcile the API account pool with deleted account files on startup, state reads and supervision, and immediately after account deletion. Persist the cleaned selection and retire removed workers after active requests finish.
- Stop retrying deleted accounts and deduplicate runtime diagnostics. Keep unreadable account files selected and report their read/decryption errors explicitly.

## macOS [2.0.6] - 2026-11-04

Includes the usage insights, team API gateway, pelican bench and settings improvements in Windows 0.2.63. Keeps native window controls and fixes bundle resources and CLI discovery when launched from Finder. The API gateway and pelican bench require Node.js 20+ and the official Cursor Agent CLI; account and quota management do not. Apple Silicon, Intel and Universal DMGs use the independent macOS OTA channel.

## Windows [0.2.63] - 2026-11-04

### Added

- The API service is now a team gateway: named keys with daily and per-minute limits, allowed models and expiry that can be disabled independently, plus request and source-IP statistics by key, account and model.
- Request logs persist in a local database with filtering, search and failure reasons, storing metadata only. Added model aliases and optional LAN access.
- Account pool changes apply immediately and exited workers restart automatically. Requests fail over on 429, 5xx and connection errors, can queue for a free worker, and support three routing strategies.
- Added a playground that reads streamed text and shows time to first byte, and generated connection snippets including Claude Code.
- The pelican bench gains a live progress grid, ratings, blind review, a leaderboard, preview navigation and source view, in-place retries, config reuse, prompt templates, time estimates and a single-file gallery export.
- Usage insights split cost by billing type: API quota, Auto quota, on-demand (actually billed) and other, reconciled automatically with official quota percentages.
- Settings can fetch China public holidays and make-up working days (from the open-source holiday-cn dataset); manual editing remains available.
- Usage insights gain a This week range; clicking a day in the trend focuses the time map and request list.

### Changed

- Redesigned Settings with General, Updates and Usage insights tabs; usage settings are reduced to working hours, background sync, usage notices and local data.
- Rearranged the usage page with uniform control sizes; the time map shows real dates for ranges up to 14 days.

### Fixed

- Fixed the start-with-app switch having no effect, Claude Code requests with `?beta=true` returning 404, no way to recover from the UI after every worker exited, and a concurrency slot being released twice when a 429 switched accounts.
- The default request timeout for new configurations is now 300 seconds instead of 45, so long answers are not cut off; saved settings are unchanged.
- Pelican account concurrency now starts the next account as soon as a slot frees up instead of waiting for a whole batch, and latency includes reading the answer.
- Cost now uses `chargedCents`, matching official totals; the exhaustion forecast no longer stays on insufficient data for accounts with bonus usage.
- Fixed the blank account picker on custom ranges, the wrapped toolbar on single accounts, and the trend chart's focus outline and dead clicks.

Published together with macOS 2.0.6.

## Windows [0.2.62] - 2026-11-04

- Restore the original potato application icon in the custom Windows title bar, preserving its colors when inactive. Local acceptance build; no OTA publication.

## Windows [0.2.61] - 2026-11-04

- Disable WebView context menus, add a compact Windows title bar with native window actions, and refine scrollbars for light and dark themes. Local acceptance build; no OTA publication.

## Windows [0.2.60] - 2026-11-03

- Align the usage page with the shared tab header: title, description, version and author support; move sync controls into the filter toolbar. Local acceptance build only; no OTA publication.

## Windows [0.2.59] - 2026-11-03

- Unify usage selectors with compact themed menus, keyboard navigation, selected checkmarks and viewport-aware positioning.
- Redesign usage insights around all-account comparison, remaining quota, request activity and account drill-down.
- Add chronological request history, selectable sorting, 20/50/100-row pagination and page jumping; introduce a labelled trend curve.
- Cancel an account's usage sync before deleting the account and associated history, without blocking unrelated accounts.
- Clarify conversation sessions versus login sessions and people. Local acceptance build; no OTA publication.

## Windows [0.2.58] - 2026-11-03

### Added

- Local usage history, a 7×24 heatmap, daily trends, model cost breakdown, Top 20 requests and CSV export.
- Configurable working hours, non-working dates and extra working dates, plus complete-week comparisons.
- Opt-in background synchronization and three configurable usage rules with durable deduplication and limited notifications.
- Quota and on-demand forecasts require complete history and reconciled billing data. Unknown Max mode and missing costs remain explicit.

## Windows [0.2.57] - 2026-10-20

### Fixed

- Cursor cross-device export checks accounts individually, skips expired or incomplete credentials, and continues exporting valid accounts.
- The export dialog shows selected, exported, and expired/skipped counts. The JSON remains directly importable as an account array.

## Windows [0.2.56] - 2026-10-20

### Fixed

- Check Cursor's refresh response, including `shouldLogout`, before switching accounts. Expired authorization no longer reports a successful switch or overwrites a valid local session.
- Preserve the actual refresh credential returned by Cursor. Show expired authorization clearly and hide stale quota data.
- Verify the installed application version and the active Cursor session when validating an account switch.

## Windows [0.2.55] - 2026-10-14

### Fixed

- Match Cursor 3.x's current session model by writing the verified session token as both accessToken and refreshToken, preventing startup from exchanging an expired legacy refresh token and logging out.
- Wait for Cursor authentication to settle after launch and verify the local session and official user identity repeatedly; cleared credentials or a mismatched account now fail the switch explicitly.

## Windows [0.2.54] - 2026-10-14

### Fixed

- Fix Cursor reopening with the previous account after a switch by clearing Cursor 3.x account profile, team, and subscription caches and synchronizing the selected identity.
- Validate account credentials before switching and refresh them when possible. Expired accounts now stop the switch with a clear error instead of closing Cursor and reporting success.
- Write authentication state in a transaction and read it back; the app updates its current-account state only after the write, launch, and post-launch verification all succeed.

## Windows [0.2.53] - 2026-10-14

### Changed

- Windows now checks for updates and downloads full installers through GitHub Releases over HTTPS.

## Windows [0.2.52] - 2026-09-15

### Added

- Add a card view to the run archive that renders every result as a thumbnail up front, instead of one click per preview. The choice is remembered.
- Retry cancelled or failed cells: check several and re-run them together, or retry a single one on its own.
- A retry can be pointed at another account, for when the original one ran out of quota. It reuses the archived prompt and overwrites the same cell, so no second archive entry appears.
- Retry progress is shown inside the detail panel and can be cancelled at any time.

### Fixed

- Loading an archive for comparison no longer puts cancelled or empty cells into the gallery, and the notice reports how many were skipped.
- The detail table no longer labels an unfinished cell's source as "no renderable content", and its open button no longer points at an empty artifact.
- Archive summaries count cancellations apart from failures, instead of blaming a model for a run the user stopped.
- Fix a failed start caused by "a test is already running" clearing the run state, which left the running batch impossible to cancel.

## Windows [0.2.51] - 2026-09-15

### Added

- Add the Pelican Benchmark: send one prompt to the models of the selected accounts, ask for a self-contained HTML document, and render the answers in-app with zoom and side-by-side comparison of up to four results.
- Pair accounts and models freely, from a single account and model up to a batch across many of both. Every account runs through its own isolated worker, leaving a running API service untouched.
- Ship presets for the latest and three prior generations from each vendor (OpenAI, Anthropic, xAI, Google, Cursor, Kimi, GLM), with search, hand-typed Model IDs, and one-click copying of one account's model list to every selected account.
- Archive each run and its HTML artifacts in the local data directory. History entries expand into per-task account, model, status, latency, output size, extraction source, and raw response, with direct preview or open-in-browser.
- Render inside a sandboxed iframe without same-origin access and inject a strict CSP, so a generated document cannot reach the network.

### Fixed

- Cancelling a batch now aborts the requests in flight instead of waiting for each one to hit its timeout.
- Results of a running batch survive navigating away and back, and the bench remembers its selection, prompt, concurrency, and timeout.
- A batch is archived as it progresses, so the completed part remains available even if the app exits mid-run.

## Windows [0.2.50] - 2026-09-08

### Added

- Add one-click Cursor IDE configuration that writes the local API service into the IDE settings.

### Fixed

- Use the correct application icon for installers and portable builds.

## Windows [0.2.49] - 2026-09-01

### Added

- Show the active model name and exact Model ID in the overview and model catalog.
- Add searchable model selection with one-click default switching and a temporary model selector for API tests.
- Add one-click copying of Base URL, Model, and API Key plus a recent latency/success visualization.

## Windows [0.2.48] - 2026-09-01

### Fixed

- Stop this app's leftover Cursor Agent / Proxy processes before installation so locked `.node` files no longer block upgrades.
- Run portable builds in an isolated instance mode so they can open beside an installed copy instead of exiting on the global single-instance gate.
- Pass `--portable` from the launcher and clean the temporary extracted resource tree after exit.

## Windows [0.2.47] - 2026-09-01

### Fixed

- Repair the bundled Cursor Agent ACP adapter for trusted chat-only workspaces, `auto`/`default[]` model selection, session mode configuration, error propagation, and structured tool-call continuations.
- Retry ordinary conversations through the non-ACP Cursor Agent path when ACP fails before its first output; tool-bearing requests preserve ACP semantics and now return the concrete ACP diagnostic.
- Mark workers ready only after `/health` and a real non-empty `/v1/models` catalog both succeed. Model failures now return a categorized HTTP 503 instead of a fabricated `auto` entry.

### Added

- Persist the loopback port, account pool, default model, ACP settings, and gateway API key in local encrypted storage, including atomic key rotation.
- Add basic and full isolated diagnostics using a random loopback port, temporary configuration root, and separate process tree. Full diagnostics cover OpenAI, Anthropic, Responses, SSE, and a required tool-call/result round trip without changing the formal service.
- Capture bounded, redacted Worker/ACP diagnostics and show Agent/Proxy versions, model count, stage status, and latency in the service page.

## Windows [0.2.46] - 2026-08-29

### Fixed

- Merge Cursor API start and stop into one stateful button: it shows Start Service while stopped and switches in place to Stop Service after startup succeeds.
- Show a spinner and Starting, Stopping, or Restarting text during transitions, mirror that transition in the status badge, and prevent duplicate clicks.
- Give the running-state Stop Service action a clear stop style so a successful startup no longer looks like an ignored click.

## Windows [0.2.45] - 2026-08-29

### Added

- Add a loopback Cursor API service backed by the selected Cursor account pool, with OpenAI Chat Completions, Anthropic Messages, and Responses-compatible endpoints.
- Bundle Cursor Agent CLI, the Node.js runtime, and `cursor-api-proxy` in the Windows package so first use no longer downloads the npm package.

### Improved

- Validate the account pool, access tokens, bundled runtimes, and ports before startup; only mark workers running after a health check and return per-worker diagnostics when startup fails.
- Add least-active round-robin routing, failure cooldown and one retry on another worker, automatic worker-port selection, and loopback proxy bypass.
- Reduce the default worker startup wait to five seconds, set the request timeout to 45 seconds, and fully reap worker processes and the listener thread when stopping.
- Show empty-pool guidance, runtime diagnostics, and clearer startup state on the Cursor API service page.

## Windows [0.2.43] / macOS [2.0.5] - 2026-08-26

### Changed

- Spin the Cursor account export icon for the whole JSON export so the toolbar does not look frozen.
- Refresh every Cursor account once when the app process starts, and spin the refresh-all toolbar icon for that run. Opening the window from the tray does not refresh again.

## macOS [2.0.4] - 2026-08-25

### Fixed

- Move macOS clients from a release-version-pinned manifest to a stable, independent HTTPS OTA channel that can advertise future releases.
- Restore the Settings manual-update event handler so checks report up-to-date, update available, or a concrete error instead of leaving the button idle.
- Record every successful manifest check, including up-to-date results, to avoid probing again on every launch.
- Fall back from Apple Silicon/Intel package keys to the Universal DMG when a channel only publishes the universal artifact.
- Probe the baked manifest first, then the stable GitHub Pages HTTPS channel and the GitHub raw mirror, and surface the failing URL in error text.
- Verify the DMG app version and code signature before replacement, keep a backup during installation, restore it if the helper is interrupted, and roll back when replacement fails.

## Windows [0.2.42] / macOS [2.0.3] - 2026-08-25

### Added

- Add native JSON drag-and-drop from Windows File Explorer and macOS Finder to the Cursor import window while keeping the file picker. Imports validate extension, the 32 MB limit, empty files, and JSON syntax first.

### Fixed

- Remove the regression-prone `includeSecrets` object/boolean argument from `export_cursor_accounts`; cross-device transfers now always use the dedicated credential-preflight export command.
- Route the website's primary download button to the macOS Universal DMG or Windows EXE after platform detection, keep it on the package chooser before detection, and retain explicit downloads for both platforms.

## macOS [2.0.2] - 2026-08-24

### Fixed

- Pin Apple Silicon and Universal builds to macOS 11.0, and the Intel-only build to macOS 10.15, covering M1–M5 and Intel Macs from Catalina onward.
- Pin the macOS build image instead of following `macos-latest`, avoiding SDK drift across release builds.
- Add pre-release validation for bundle minimum OS, every embedded Mach-O architecture, signature integrity, and an eight-second launch smoke test.
- Correct the macOS bundle product name and wire Apple Developer signing/notarization credentials into the release build.

### Released

- Advance the independent macOS version line to `2.0.2`; Windows remains on `0.2.41`.

## macOS [2.0.1] - 2026-08-23

### Released

- macOS now has an independent version line managed by `release/platform-versions.json` (`macos: 2.0.1`).
- macOS uses `/cursor-account-cockpit/updates/macos/latest.json`; Windows remains on `/cursor-account-cockpit/updates/windows/latest.json`.
- The macOS OTA artifact is a Universal DMG; the client verifies its size and SHA-256 before replacing and relaunching the app.

## [0.2.41] - 2026-08-21

### Fixed

- Replace the Cursor page's ambiguous confirm/cancel export flow with a dedicated cross-device transfer export that always includes both stored AT and RF credentials.
- Preflight every selected account before creating the file: recover credentials from raw Cursor auth data, exchange RF for a fresh AT and the latest rotated RF, and stop with an account-specific message when credentials are rejected.
- Reject app-export-shaped imports that omit RF instead of accepting an account that will fail after AT expires; validate a whole batch before writing any account.
- Label the export modal as a complete cross-device backup and state clearly that the saved JSON contains sensitive transfer credentials.

## [0.2.40] - 2026-08-21

### Fixed

- Fix the Cursor account page silently taking the default redacted-export path. Cross-device export now prompts from the page's real export entry and includes AT+RF whenever the source account has a stored refreshToken; redacted lists with an empty accessToken are rejected on import.
- Normalize WorkOS cookie-wrapped tokens, fall back to stored authId when building the session cookie, and surface clearer refresh errors when refreshToken is missing.
- Keep the full product title visible in the expanded sidebar and align the brand logo and all navigation icons to one center axis when collapsed.

### Changed

- Cursor-only sidebar can collapse to icons and expand again, with a smoother width/label transition and a toggle that remains available at the minimum window width.

## [0.2.39] - 2026-08-18

### Added

- The author and support dialog includes a button that opens the project website in the browser.
- When in-app update download or install fails, show an official-site fallback with the latest version.

## [0.2.38] - 2026-08-17

### Fixed

- Personal release builds bake the private OTA manifest URL again (instead of GitHub Releases).
- Retry transient HTTP/CDN failures during update download and include the status code in errors.
- Cursor import / token / OAuth returns immediately after saving; quota refresh continues in the background so the import UI does not keep spinning, and the refresh-all button spins while that background refresh runs.

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
