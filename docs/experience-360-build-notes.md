# 360 Room View Build Notes

## Purpose

The homepage 360 room view was built as a reusable interactive preview pattern for Rose Quartz. It lets guests pan around a generated massage-room concept image, jump between curated room views, and fall back to a still image when WebGL is unavailable.

## Reference Pattern

The implementation was modeled after the Sipopedia 360 terroir view in:

- `C:\codebase\sip_studies\actual\Sip-Studies\src\components\VineyardPanoramaViewer.tsx`
- `C:\codebase\sip_studies\actual\Sip-Studies\src\components\SipMaps.tsx`
- `C:\codebase\sip_studies\actual\Sip-Studies\public\panoramas\`

The shared pattern is:

1. Store a 2:1 equirectangular panorama image in `public/panoramas/`.
2. Load it as a Three.js texture.
3. Wrap it around the inside of a sphere.
4. Place the camera at the center of the sphere.
5. Rotate the camera target with drag, touch, wheel, and preset waypoint controls.

## How This Feature Was Created

1. I reviewed the Sipopedia implementation first, specifically its panorama viewer component, map wiring, and `public/panoramas/` asset pattern.
2. I generated a Rose Quartz massage-room panorama as a 2:1 equirectangular image so it could be wrapped inside a sphere without distortion.
3. I saved that image in `public/panoramas/rose-quartz-massage-room-360.png`, matching the Sipopedia public asset approach.
4. I installed `three` and built a standalone `assets/js/panorama-viewer.js` module instead of adding the 360 code directly into the main site script.
5. I added a lazy import in `assets/js/site.js` so Three.js loads only on pages that include `[data-panorama-viewer]`.
6. I replaced the old homepage preview area with a real interactive `#experience-360` section in `index.html`.
7. I added waypoint buttons for the table, arrival corner, water wall/greenery, and aftercare station.
8. I tuned the waypoint angles from browser screenshots until the labels matched the actual view shown in the panorama.
9. I added responsive CSS for the desktop two-column layout and the stacked mobile layout.
10. I added a still-image fallback so the page still shows the massage room if WebGL or the viewer module fails.
11. I validated the result with Vite build checks, launch checks, sitemap dry-run, browser screenshots, and canvas pixel sampling.

## Rose Quartz Files

- `index.html`
  - Adds the `#experience-360` homepage section.
  - Uses `data-panorama-viewer` and `data-panorama-src`.
  - Defines the room waypoints: Table, Arrival, Calm, and Return.
  - Provides the no-WebGL still-image fallback.

- `assets/js/panorama-viewer.js`
  - Initializes every `[data-panorama-viewer]` section.
  - Uses Three.js `Scene`, `PerspectiveCamera`, `SphereGeometry`, `TextureLoader`, and `WebGLRenderer`.
  - Handles pointer drag, touch drag, pinch zoom, wheel zoom, slow auto-rotate, zoom buttons, reset, and waypoint changes.
  - Updates the visible "Now viewing" label and summary from waypoint data attributes.

- `assets/js/site.js`
  - Lazy-loads `panorama-viewer.js` only when a page includes `[data-panorama-viewer]`.
  - Shows the still-image fallback if the viewer module fails to load.

- `assets/css/styles.css`
  - Defines the two-column desktop layout and stacked mobile layout.
  - Styles the stage, controls, fallback image, copy card, and waypoint buttons.
  - Keeps the viewer height stable so the canvas does not stretch or collapse.

- `public/panoramas/rose-quartz-massage-room-360.png`
  - Generated 2:1 concept panorama for the Rose Quartz room preview.
  - It is a placeholder/concept asset until final real room photography is available.

- `package.json` and `package-lock.json`
  - Adds `three` as the only new runtime dependency.

## Generated Image Direction

The panorama was generated as a 2:1 equirectangular image so it can map cleanly onto the inside of a sphere. The direction emphasized:

- Boutique massage room, not a generic spa stock photo.
- Centered massage table with warm linens and bolsters.
- Rose quartz/mineral details, warm wood, soft lighting, greenery, water texture, and calm aftercare details.
- No people, logos, visible text, or medical-clinic harshness.
- Seamless 360-style room continuity.

Future replacements should keep the same 2:1 panorama ratio and should be placed in `public/panoramas/`.

## Waypoint Setup

Each waypoint is a button with data attributes:

```html
<button
  type="button"
  data-panorama-waypoint
  data-lon="180"
  data-lat="-3"
  data-fov="62"
  data-panorama-label="Table and room center"
  data-panorama-summary="The table, bolsters, linens, light, and room path are visible together..."
>
  <span>01</span>Table
</button>
```

The key values:

- `data-lon`: horizontal camera angle.
- `data-lat`: vertical camera angle.
- `data-fov`: zoom level.
- `data-panorama-label`: title shown in the copy card.
- `data-panorama-summary`: supporting copy shown in the copy card.

The current Rose Quartz waypoint angles were tuned against screenshots:

- Table: `lon=180`, `lat=-3`, `fov=62`
- Arrival: `lon=90`, `lat=-2`, `fov=58`
- Calm: `lon=270`, `lat=-1`, `fov=58`
- Return: `lon=120`, `lat=-4`, `fov=60`

## Reuse Checklist

To reuse this viewer on another page or project:

1. Add `three` to the project if it is not already installed.
2. Add a 2:1 panorama image to `public/panoramas/`.
3. Copy or adapt `assets/js/panorama-viewer.js`.
4. Add a section with `data-panorama-viewer` and `data-panorama-src="/panoramas/example.png"`.
5. Add waypoint buttons with `data-panorama-waypoint`.
6. Lazy-load the viewer from the main site script.
7. Add a still-image fallback for browsers without WebGL.
8. Verify desktop and mobile screenshots.

## Validation Used

The final Rose Quartz implementation was checked with:

```powershell
npm.cmd run build
npm.cmd run launch-check
npm.cmd run sitemap -- --site-url=https://rosequartzmassage.com --dry-run
git diff --check
node .qa\playwright-panorama-check.mjs
```

Notes from validation:

- Build passed.
- Launch readiness passed with known launch-detail warnings.
- Sitemap dry-run passed.
- `git diff --check` only reported expected CRLF normalization warnings.
- Playwright confirmed the viewer canvas renders on desktop and mobile, fallback stays hidden when WebGL works, waypoint labels update, and sampled canvas pixels are nonblank.
- Vite reports the lazy panorama chunk is slightly over 500 KB. That is expected because Three.js is isolated in an optional dynamic import instead of being added to the main site bundle.
