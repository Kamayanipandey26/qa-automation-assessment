# QA Automation Engineer - Technical Assessment

Framework: **Cucumber (BDD) + Playwright + TypeScript**

Cucumber provides the test structure (Gherkin `.feature` files, human-readable scenarios).
Playwright provides the automation engine underneath — driving the browser for UI tests and
sending HTTP requests directly for API tests.

## Chosen targets

| Part | Target | Notes |
|---|---|---|
| A - UI | [asos.com](https://www.asos.com) | Publicly accessible shopping site, no login/payment flows touched |
| B - API | [Swagger Petstore v2](https://petstore.swagger.io/v2) | Public REST API, full CRUD on `/pet`, no auth required |

## Project structure
.
├── cucumber.js # Cucumber config: where features/step-definitions live
├── features/
│ ├── ui/# QA Automation Engineer - Technical Assessment

Framework: **Playwright Test with TypeScript**, using the **Page Object Model (POM)** pattern.

## Chosen targets

| Part | Target | Notes |
|---|---|---|
| A - UI | [asos.com](https://www.asos.com) | Publicly accessible shopping site, no login/payment flows touched |
| B - API | [Swagger Petstore v2](https://petstore.swagger.io/v2) | Public REST API, full CRUD on `/pet`, no auth required |

## Project structure
│ │ ├── homePage.feature # Test 1: Home Page Verification
│ │ ├── categoryNavigation.feature # Test 2: Category Navigation (Women + Men)
│ │ └── search.feature # Test 3: Search Functionality
│ ├── api/
│ │ └── petCrud.feature # Tests 4-7: Full CRUD lifecycle
│ ├── step-definitions/
│ │ ├── homePage.steps.ts
│ │ ├── categoryNavigation.steps.ts
│ │ ├── search.steps.ts
│ │ └── petCrud.steps.ts
│ └── support/
│ ├── world.ts # Shared state (browser/page, pet id/name, API response)
│ └── hooks.ts # Before/After: browser launch/teardown, timeout config
├── verification/ # Screenshots from the UI tests
├── package.json
└── tsconfig.json


## Setup

Requires Node.js 18+.

```bash
npm install
npx playwright install --with-deps chromium
```

## Running the tests

```bash
npm run test:bdd
```

This runs all UI and API scenarios together (5 scenarios, 36 steps).

Screenshots from the UI tests are saved to `verification/`:
- `home_page.png`
- `category_navigation_women.png`
- `category_navigation_men.png`
- `search_results.png`

## Test coverage

**Part A - UI (asos.com)**
1. **Home Page Verification** - loads the home page, asserts the logo, WOMEN/MEN nav links,
   and search button are present, then captures a full-page screenshot.
2. **Category Navigation** - two scenarios: clicking WOMEN and clicking MEN each assert the
   correct destination URL and page `<title>`, then capture a screenshot.
3. **Search Functionality** - searches for "dress", asserts the results page URL contains the
   query and the "Your search results for..." heading displays the search term, then captures
   a screenshot.

**Part B - API (Swagger Petstore)**
One scenario covering the full lifecycle, using dynamically generated test data
(`Date.now()` for the id, a random string for the name) so the suite is repeatable:
4. **Create** - `POST /pet`; asserts a successful response with the submitted id/name echoed back.
5. **Read and Verify** - `GET /pet/{id}`; asserts the retrieved data matches what was created.
6. **Update** - `PUT /pet` with a changed name; asserts the response reflects the update.
7. **Delete and Confirm** - `DELETE /pet/{id}`, then a follow-up `GET` asserts a 404 response.

## Notes

- No login, payment, or account-creation flows are exercised in Part A.
- Locators for UI tests prioritize `data-testid` attributes where available (found via browser
  DevTools inspection) for stability over text-based matching, which proved ambiguous on pages
  with repeated text (e.g. "WOMEN" appearing in multiple places beyond the nav link).
- Cucumber's default step timeout (5s) was raised to 20s in `hooks.ts` to accommodate full-page
  screenshots on image-heavy pages.



