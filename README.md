# blurts-data-classes-stats

Statistics for Firefox Monitor breach data classes.

## USAGE

### CLI

```sh
npx pdehaan/blurts-data-classes-stats
```

The CLI accepts two arguments (via env vars):

- `BREACHES_URL` &mdash; fully qualified domain and path to the breaches API. Default: "https://monitor.firefox.com/api/hibp".
- `MAX_RESULTS` &mdash; the maximum number of returned records (sorted by total breached accounts in descending order). Default: 1000 (completely arbitrary number).

The following command should show the top 10 most "popular" data classes in a breach:

```sh
MAX_RESULTS=10 npx pdehaan/blurts-data-classes-stats
```

The following command would query the HaveIBeenPwned API directly (if that's your thing):

```sh
BREACHES_URL=https://haveibeenpwned.com/api/v3/breaches npx pdehaan/blurts-data-classes-stats
```

### API

#### Installation

**NOTE:** This module isn't published to npm, so you need to install it from GitHub directly.

```sh
npm i pdehaan/blurts-data-classes-stats -S
```

#### Example

```js
// npm i pdehaan/blurts-data-classes-stats -S
const lib = require("blurts-data-classes-stats");

lib.dataClassesStats("https://monitor.firefox.com/hibp/breaches", 20)
  .then(stats => console.log(stats));
```

#### Output

```js
[
  { Name: 'email addresses', PwnCount: 8507975996 },
  { Name: 'passwords', PwnCount: 6429834429 },
  { Name: 'names', PwnCount: 3246167703 },
  { Name: 'usernames', PwnCount: 2328365295 },
  { Name: 'ip addresses', PwnCount: 2168376335 },
  { Name: 'physical addresses', PwnCount: 1924359179 },
  { Name: 'phone numbers', PwnCount: 1895502230 },
  { Name: 'dates of birth', PwnCount: 1689505349 },
  { Name: 'geographic locations', PwnCount: 1658595241 },
  { Name: 'genders', PwnCount: 1658206106 },
  { Name: 'job titles', PwnCount: 1255434032 },
  { Name: 'employers', PwnCount: 1164712625 },
  { Name: 'social media profiles', PwnCount: 355082301 },
  { Name: 'spoken languages', PwnCount: 322995877 },
  { Name: 'website activity', PwnCount: 283313968 },
  { Name: 'ethnicities', PwnCount: 200017605 },
  { Name: 'income levels', PwnCount: 176416518 },
  { Name: 'marital statuses', PwnCount: 168858164 },
  { Name: 'education levels', PwnCount: 160107656 },
  { Name: 'religions', PwnCount: 158970778 }
]
```
