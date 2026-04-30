# Laravel Boost
@if($assist->hasMcpEnabled())

## Tools
- Laravel Boost is an MCP server with tools designed specifically for this application. Prefer Boost tools over manual alternatives like shell commands or file reads.
- Use ___SINGLE_BACKTICK___database-query___SINGLE_BACKTICK___ to run read-only queries against the database instead of writing raw SQL in tinker.
- Use ___SINGLE_BACKTICK___database-schema___SINGLE_BACKTICK___ to inspect table structure before writing migrations or models.
- Use ___SINGLE_BACKTICK___get-absolute-url___SINGLE_BACKTICK___ to resolve the correct scheme, domain, and port for project URLs. Always use this before sharing a URL with the user.
@if (config('boost.browser_logs', false) !== false || config('boost.browser_logs_watcher', true) !== false)
- Use ___SINGLE_BACKTICK___browser-logs___SINGLE_BACKTICK___ to read browser logs, errors, and exceptions. Only recent logs are useful, ignore old entries.
@endif

## Searching Documentation (IMPORTANT)
- Always use ___SINGLE_BACKTICK___search-docs___SINGLE_BACKTICK___ before making code changes. Do not skip this step. It returns version-specific docs based on installed packages automatically.
- Pass a ___SINGLE_BACKTICK___packages___SINGLE_BACKTICK___ array to scope results when you know which packages are relevant.
- Use multiple broad, topic-based queries: ___SINGLE_BACKTICK___['rate limiting', 'routing rate limiting', 'routing']___SINGLE_BACKTICK___. Expect the most relevant results first.
- Do not add package names to queries because package info is already shared. Use ___SINGLE_BACKTICK___test resource table___SINGLE_BACKTICK___, not ___SINGLE_BACKTICK___filament 4 test resource table___SINGLE_BACKTICK___.
### Search Syntax
1. Use words for auto-stemmed AND logic: ___SINGLE_BACKTICK___rate limit___SINGLE_BACKTICK___ matches both "rate" AND "limit".
2. Use ___SINGLE_BACKTICK___"quoted phrases"___SINGLE_BACKTICK___ for exact position matching: ___SINGLE_BACKTICK___"infinite scroll"___SINGLE_BACKTICK___ requires adjacent words in order.
3. Combine words and phrases for mixed queries: ___SINGLE_BACKTICK___middleware "rate limit"___SINGLE_BACKTICK___.
4. Use multiple queries for OR logic: ___SINGLE_BACKTICK___queries=["authentication", "middleware"]___SINGLE_BACKTICK___.
@endif

## Artisan
- Run Artisan commands directly via the command line (e.g., ___SINGLE_BACKTICK___{{ $assist->artisanCommand('route:list') }}___SINGLE_BACKTICK___). Use ___SINGLE_BACKTICK___{{ $assist->artisanCommand('list') }}___SINGLE_BACKTICK___ to discover available commands and ___SINGLE_BACKTICK___{{ $assist->artisanCommand('[command] --help') }}___SINGLE_BACKTICK___ to check parameters.
- Inspect routes with ___SINGLE_BACKTICK___{{ $assist->artisanCommand('route:list') }}___SINGLE_BACKTICK___. Filter with: ___SINGLE_BACKTICK___--method=GET___SINGLE_BACKTICK___, ___SINGLE_BACKTICK___--name=users___SINGLE_BACKTICK___, ___SINGLE_BACKTICK___--path=api___SINGLE_BACKTICK___, ___SINGLE_BACKTICK___--except-vendor___SINGLE_BACKTICK___, ___SINGLE_BACKTICK___--only-vendor___SINGLE_BACKTICK___.
- Read configuration values using dot notation: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('config:show app.name') }}___SINGLE_BACKTICK___, ___SINGLE_BACKTICK___{{ $assist->artisanCommand('config:show database.default') }}___SINGLE_BACKTICK___. Or read config files directly from the ___SINGLE_BACKTICK___config/___SINGLE_BACKTICK___ directory.
- To check environment variables, read the ___SINGLE_BACKTICK___.env___SINGLE_BACKTICK___ file directly.

## Tinker
- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: ___SINGLE_BACKTICK___{{ $assist->artisanCommand("tinker --execute 'Your::code();'") }}___SINGLE_BACKTICK___
  - Double quotes for PHP strings inside: ___SINGLE_BACKTICK___{{ $assist->artisanCommand("tinker --execute 'User::where(\"active\", true)->count();'") }}___SINGLE_BACKTICK___
