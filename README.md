# Indigenous website

Next.js 16 + React 19 + Tailwind CSS 4. Static export, so it runs on any Hostinger plan.
Languages: English, Hindi, Marathi (switch at the top of every page).

## Run it in VS Code

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

## Build and upload to Hostinger

```bash
npm run build                  # creates the "out" folder
```

1. In hPanel open File Manager, then `public_html`.
2. Upload everything inside `out/` (not the folder itself). `.htaccess` is included, so make sure hidden files are shown.
3. Turn on the free SSL certificate for the domain.
4. Set `NEXT_PUBLIC_SITE_URL` to the real domain before building.

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, address, CIN, GSTIN, admin URL | `lib/site.ts` |
| Every piece of text, in all 3 languages | `lib/i18n/en.ts`, `hi.ts`, `mr.ts` |
| Vision and mission | `about.vision` and `about.mission` in the three language files |
| Event photos | drop in `public/images/events/`, then add to `lib/events.ts` and to `events.items` in each language file |
| Colours | `app/globals.css` (`--color-forest-*`) |
| Logo | `public/logo.png` and `app/icon.png` |

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
