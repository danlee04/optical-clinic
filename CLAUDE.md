@AGENTS.md

# Security audit (every session)

At the start of every session, before changing any file, run this audit and give the owner the report. Do not fix anything until the owner approves. Act as a senior Next.js application security engineer.

## Rules

- Inspect the whole project recursively, including hidden, config, CI, docs, `public/`, and test files. Never review only the obvious files.
- Audit is read-only and non-destructive: no file edits, no deletes, no production systems, no attacks on third parties, no credential rotation, no deployment setting changes.
- Never print secret values. Write `SECRET DETECTED — VALUE REDACTED` with file and line.
- Treat all client code and every `NEXT_PUBLIC_*` value as public.
- Prefer evidence over assumptions. Verify the real production build (`out/`), not only the source.
- Do not invent findings. For each one, check: reachable? attacker-controlled input? validation? realistic attack path? real impact? Label theoretical risks as theoretical.
- Mark categories that don't apply as `Not Applicable — Reason: …`. Do not skip them silently.
- Don't install security tools without saying why.
- Keep going until every category below is checked.

## Steps

1. **Architecture summary**
   - Versions: Next.js, React, Node.
   - Router and rendering: App or Pages Router; static export, SSR, SSG or ISR.
   - Server functionality: Route Handlers, Server Actions, middleware or proxy.
   - Users and data: auth, forms, user input, external APIs, third-party scripts, CDNs, analytics, cookies, browser storage, uploads, dynamic routes.
   - Is it truly static?
2. **Commands**
   - `npm audit`, `npm run lint`, `npm run typecheck`, `npm run build`.
   - Inspect the generated HTML/JS in `out/` for secrets, unexpected routes, source maps and server features.

## Checklist

| #   | Area                         | What to check                                                                                                                                                                                                                                                           |
| --- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Next.js config               | Known CVEs for the installed version; `next.config.*`: export, images/remote domains, redirects, rewrites, headers, `productionBrowserSourceMaps`, `poweredByHeader`; functionality a static site doesn't need                                                          |
| 2   | XSS                          | `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `document.write`, `eval`, `new Function`, dynamic scripts; data from URL, query, hash or storage reaching a sink. Trace **source → processing → sink**                                                             |
| 3   | Injection                    | SQL/NoSQL, command (`exec`, `spawn`, `child_process`), template, HTML/CSS/JS/URL/JSON injection, ReDoS, unsafe parsers, dynamic imports                                                                                                                                 |
| 4   | Input validation             | Route/query params, forms, storage, cookies, `postMessage`, API responses: validated, encoded, constrained?                                                                                                                                                             |
| 5   | Redirects and URLs           | `window.location`, `router.push/replace`, `redirect`/`next`/`returnUrl` params, `javascript:` and `data:` URLs, attacker-controlled links                                                                                                                               |
| 6   | Secrets                      | Keys, tokens, passwords, private keys, certificates in source, `.env*`, JSON, scripts, docs, comments; sensitive values behind `NEXT_PUBLIC_`                                                                                                                           |
| 7   | Git hygiene                  | `.gitignore` covers `.env*`, `*.pem`, `*.key`, credential files and build output; tracked secrets in history                                                                                                                                                            |
| 8   | Dependencies                 | `npm audit`, outdated/abandoned/suspicious/unneeded packages, duplicates, `pre/postinstall` scripts, lock file present                                                                                                                                                  |
| 9   | Third-party scripts          | Domain, HTTPS, necessity, trust, DOM access, SRI, CSP impact                                                                                                                                                                                                            |
| 10  | CSP                          | Directives: `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`, `frame-src`, `object-src`, `base-uri`, `form-action`, `frame-ancestors`. Don't recommend `'unsafe-inline'`/`'unsafe-eval'` without a demonstrated need; explain limits of the architecture |
| 11  | Security headers             | CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, cache headers, `X-Powered-By`. Say where they are set (Next.js has no effect on a static export: host/CDN config such as `vercel.json`)                                |
| 12  | CORS / CSRF / Auth / Cookies | Only if APIs, authenticated state changes, login or cookies exist; otherwise Not Applicable with reason. A form alone is not CSRF                                                                                                                                       |
| 13  | Browser storage              | Tokens, personal or payment data in localStorage, sessionStorage, IndexedDB or cookies                                                                                                                                                                                  |
| 14  | Uploads / path traversal     | Uploads: MIME, size, filename, SVG, storage. Filesystem calls with user input: `../`, `path.join`, `fs.*`                                                                                                                                                               |
| 15  | SVG and static assets        | SVGs with scripts, event handlers or external refs; `public/` and `out/` leaking configs, backups, `.map`, test or debug files. Everything in `public/` is public                                                                                                       |
| 16  | External APIs                | Endpoint, auth method, key exposure (intentional or accidental), request validation, error handling, rate limits                                                                                                                                                        |
| 17  | Error disclosure             | Stack traces, paths, env values, internal URLs or debug output visible to users; console logging of form data                                                                                                                                                           |
| 18  | Build output                 | Source maps, reconstructable source, secrets in bundles, exposed `.next` or debug files                                                                                                                                                                                 |
| 19  | SEO / crawler                | `robots.txt` and sitemap revealing internal routes (robots.txt is not security)                                                                                                                                                                                         |
| 20  | Transport                    | Hardcoded `http://`, mixed content, insecure API, image or script URLs                                                                                                                                                                                                  |
| 21  | Deployment                   | Host config (Vercel, etc.): HTTPS, headers, caching, env vars, preview protection, build commands, anything less secure than the source                                                                                                                                 |
| 22  | Resource abuse               | Unbounded input, expensive regex, large payloads, heavy client work (DoS/ReDoS)                                                                                                                                                                                         |
| 23  | TypeScript                   | `any`, unchecked casts, non-null assertions, validation gaps with security impact                                                                                                                                                                                       |

## Report format

Each finding:

```
### [SEVERITY] Title
Severity: Critical | High | Medium | Low | Informational
Category / File / Line
Evidence (no secret values)
Attack scenario
Impact
Recommendation
Verification (how to confirm the fix)
```

Severity:

- **Critical:** code execution, credential compromise, major data exposure, takeover.
- **High:** fix before deploying.
- **Medium:** conditional or limited impact.
- **Low:** hardening.
- **Informational:** best practice.

End the report with:

1. **Score:** `Overall Security Rating: X/10` (never 10/10 just because nothing obvious was found) and `Deployment Readiness: PASS | CONDITIONAL PASS | FAIL`.
2. **Summary:** a table of counts per severity, then findings listed by severity.
3. **Checklist:** a deployment readiness checklist covering:
   - Application: build passes, no Critical or High issues, no secrets, no unneeded server features, redirects/XSS/input/APIs reviewed.
   - Dependencies: audited, lock file present, vulnerable or suspicious packages handled.
   - Configuration: env vars, no secrets in `NEXT_PUBLIC_*`, debug off, headers, CSP, HTTPS.
   - Static files: `public/` reviewed, SVGs reviewed, source maps reviewed.
   - Deployment: host config, HTTPS, headers verified, caching, production build and live site tested.
4. **Decision:**
   - **PASS:** no Critical or High issues.
   - **CONDITIONAL PASS:** Medium or Low issues to address.
   - **FAIL:** Critical or High issues must be fixed first.

   Then list the top 5 actions to take before deployment.
