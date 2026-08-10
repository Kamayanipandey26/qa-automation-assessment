# QA Automation Engineer - Technical Assessment

Framework: **Playwright Test with TypeScript**, using the **Page Object Model (POM)** pattern.

## Chosen targets

| Part | Target | Notes |
|---|---|---|
| A - UI | [asos.com](https://www.asos.com) | Publicly accessible shopping site, no login/payment flows touched |
| B - API | [Swagger Petstore v2](https://petstore.swagger.io/v2) | Public REST API, full CRUD on `/pet`, no auth required |

## Project structure
```
├── playwright.config.ts        # baseURL, projects (UI + API), workers, reporter
├── tests/
│   ├── pages/                  # Page Object classes (locators + actions + assertions)
│   │   ├── HomePage.ts
│   │   ├── CategoryPage.ts
│   │   ├── SearchPage.ts
│   │   └── PetApiClient.ts
│   ├── data/
│   │   └── testData.ts         # Reusable test data and dynamic data generators
│   ├── fixtures/
│   │   └── pageFixtures.ts     # Custom fixtures - auto-inject Page Objects into tests
│   ├── ui/
│   │   ├── homePage.spec.ts
│   │   ├── categoryNavigation.spec.ts
│   │   └── search.spec.ts
│   └── api/
│       └── petCrud.spec.ts
├── verification/                # Screenshots from the UI tests
└── tsconfig.json
```
## Setup

Requires Node.js 18+.

```bash
npm install
npx playwright install --with-deps chromium
```

## Running the tests

```bash
npm test              # run everything
npm run test:ui       # UI tests only
npm run test:api      # API tests only
npm run report        # open the last HTML report
```

Tests run with `workers: 1` since the browser runs in headed mode (`headless: false`) for
local visibility - running multiple visible browser windows in parallel caused window
interference and flaky results, so this trades some speed for reliability.

Screenshots from the UI tests are saved to `verification/`:
- `home_page.png`
- `category_navigation_women.png`
- `category_navigation_men.png`
- `search_results.png`

## Architecture

- **Page Objects** (`tests/pages/`) hold all locators and page-specific actions/assertions.
  Test files never contain raw selectors - if the site's markup changes, only the relevant
  Page Object needs updating.
- **Fixtures** (`tests/fixtures/pageFixtures.ts`) extend Playwright's base `test` to
  automatically construct and inject Page Object instances into every test, removing repeated
  setup code from test files.
- **Test data** (`tests/data/testData.ts`) centralizes reusable values and dynamic data
  generators (e.g. unique pet IDs/names), instead of hardcoding values inside test files.
- **Config** (`playwright.config.ts`) defines `baseURL` per project (ASOS for UI, Petstore for
  API) so test files use relative paths/URLs only.

## Test coverage

**Part A - UI (asos.com)**
1. **Home Page Verification** - loads the home page, asserts the logo, WOMEN/MEN nav links,
   and search button are present via `HomePage`, then captures a full-page screenshot.
2. **Category Navigation** - two scenarios (Women, Men): clicks the nav link via `HomePage`,
   verifies the destination URL/title via `CategoryPage`, then captures a screenshot.
3. **Search Functionality** - searches via `HomePage`, verifies results via `SearchPage`
   (URL contains the query, results heading displays the search term), then captures a
   screenshot.

**Part B - API (Swagger Petstore)**
One test covering the full CRUD lifecycle via `PetApiClient`, using dynamically generated test
data (`generatePetId()`, `generatePetName()` from `testData.ts`):
4. **Create** - `POST /pet`; asserts a successful response with the submitted id/name echoed back.
5. **Read and Verify** - `GET /pet/{id}`; asserts the retrieved data matches what was created.
6. **Update** - `PUT /pet` with a changed name; asserts the response reflects the update.
7. **Delete and Confirm** - `DELETE /pet/{id}`, then a follow-up `GET` asserts a 404 response.

## Notes

- No login, payment, or account-creation flows are exercised in Part A.
- Locators prioritize `data-testid` attributes where available (found via browser DevTools
  inspection) for stability over text-based matching, which proved ambiguous on pages with
  repeated text.
- API paths in `PetApiClient.ts` are relative without a leading slash (e.g. `'pet'`, not
  `'/pet'`), since the configured `baseURL` includes the `/v2` path segment - a leading slash
  would reset to the domain root and drop it.