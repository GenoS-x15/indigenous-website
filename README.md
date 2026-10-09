# Indigenous website

Next.js 16 + React 19 + Tailwind CSS 4. Static export, so it runs on any Hostinger plan.
Languages: English, Hindi, Marathi (switch at the top of every page).

## Run it on your computer

Needs [Node.js LTS](https://nodejs.org). Open this folder in VS Code, then in the terminal:

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

Do not open the files in `out/` by double-clicking: the site uses paths that only work on a web server.

## Build and upload to Hostinger

```bash
npm run build                  # creates the "out" folder
```

1. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the real domain **before** building (used for links, sitemap and previews).
2. In hPanel open File Manager, then `public_html`.
3. Upload everything inside `out/` (not the folder itself). `.htaccess` is included, so make sure hidden files are shown.
4. Turn on the free SSL certificate for the domain.

`npm run build` also runs two small helper scripts:

- `scripts/app-meta.mjs` (before) reads the Android app file, see below.
- `scripts/fix-export.mjs` (after) corrects page-prefetch file names that Next.js gets wrong when building on Windows.

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, address, CIN, GSTIN, app name, admin URL | `lib/site.ts` |
| Every piece of text, in all 3 languages | `lib/i18n/en.ts`, `hi.ts`, `mr.ts` (same keys in all three) |
| Vision and mission | `about.vision` and `about.mission` in the three language files |
| Goat facts in the ticker, breed spotlight, life cycle, milk journey | `ticker`, `breed`, `lifecycle`, `journey` in the three language files |
| Event photos | drop in `public/images/events/`, then add to `lib/events.ts` and to `events.items` in each language file |
| Banner and section photos | `public/images/web/`, credits in `lib/credits.ts` (see Images below) |
| Page transitions | `lib/transitions.ts` |
| Colours | `app/globals.css` (`--color-forest-*`) |
| Logo | `public/logo.png` and `app/icon.png` |

## Images and credits

- Your own photos are in `public/images/` and `public/images/events/`.
- Photos from the internet are in `public/images/web/`. Each one comes from Wikimedia Commons under CC0, CC BY or CC BY-SA,
  and is listed in `lib/credits.ts`, which feeds the `/credits/` page linked in the footer.
- Each web photo has two files: a desktop file (`banner-about.webp`) and a smaller mobile file (`banner-about-800.webp`;
  the home hero uses `hero-goats-mobile.webp`). Sizes: hero 2400x1600, banners 1920x1080, section photos 1200x900.
- To replace one, keep the same file names and sizes (WebP, banners under 250 KB), then update its entry in `lib/credits.ts`.
  To add a new one, also add its credit. Only use photos whose licence allows reuse, and never put credit text on the photo.

## Email links

Every email address uses `components/EmailLink.tsx`:

- On phones and tablets it is a normal `mailto:` link, which opens Gmail or the default mail app.
- On computers a click opens Gmail compose in a new tab, because many computers have no mail app.
  Middle-click and browsers without JavaScript still use `mailto:`.
- A small copy button next to it copies the address and says "Copied" in the current language.

The address comes only from `SITE.email` in `lib/site.ts`.

## Android app (Zalgo)

The app name is `SITE.app.name` in `lib/site.ts`; texts write `{app}` where the name goes.

The staff page, home page and `/download/` page offer the app in this order:

1. If `NEXT_PUBLIC_APP_URL` (the Google Play link) is set in `.env.local`: a "Get it on Google Play" button.
2. Otherwise, if the APK file is present: a "Download app (APK)" button with version, size, date, SHA-256 and install steps.
3. Otherwise: "Available soon".

To publish an APK:

1. Put the file at `public/downloads/indigenous-app.apk` (this exact name).
2. Optional: create `public/downloads/version.txt` with the version on the first line, for example `1.0.3`.
3. Run `npm run build` and upload `out/` as usual. The details are read automatically.

The APK is not stored in git (see `.gitignore`); keep your own copy. `public/.htaccess` serves it as a download,
with the Android content type and no long-term caching, so phones get a new version as soon as you upload it.

## Page transitions

Each page has its own entrance, set in one place, `lib/transitions.ts`:

| Page | Motion |
| --- | --- |
| Home | zoom |
| About | slide in from the right |
| Project, Download | slide up |
| Care guide | wipe from the left |
| Women training | slide in from the left |
| Events | circle that grows from the point you clicked |
| Staff | fade in from a blur |
| Contact | slide down |
| Legal pages, credits | fade |

The old page leaves in 220 ms with a matching motion, and the whole change stays under 700 ms. To change a page, edit its
line in `lib/transitions.ts`; the motions themselves are the `.page[data-enter=...]` rules in `app/globals.css`.
Visitors who ask their device for reduced motion get an instant page change and no animations.

## Staff portal and admin panel

The `/staff/` page is the entry point for employees. Set `NEXT_PUBLIC_ADMIN_URL` in `.env.local`
(for example `https://admin.your-domain.com`) and rebuild. Until it is set, the button shows "Available soon".
If you host the admin panel on this same domain later, extend `connect-src` in `public/.htaccess`
with the Firebase hosts it uses.

## Google Play checklist

- Privacy policy URL: `https://your-domain.com/privacy/`
- Account deletion URL: `https://your-domain.com/account-deletion/`
- Terms: `/terms/`. Support email: igbdpl22@gmail.com
- Data safety form: declare name, email, phone, photos, location (if used), app activity (goat records) and diagnostics. Keep it consistent with the privacy policy.
- Declare only the permissions the app really uses (camera, photos, location, notifications).
- Have the legal pages reviewed by a lawyer before publishing.

## Security included

HTTPS redirect, HSTS, Content-Security-Policy, X-Frame-Options, nosniff, Referrer-Policy and Permissions-Policy in
`public/.htaccess`; external links use `rel="noopener noreferrer"`; directory listing is disabled; no secrets are stored
in the site. Firebase keys, if used later, belong in the admin panel and are protected by Firestore security rules.

## Credits

Website designed and developed by Genos Cybernetics (shown quietly in the footer).
Photo credits are on the `/credits/` page.
