#!/usr/bin/env node

const {dataClassesStats} = require("./lib");

main(process.env.BREACHES_URL, process.env.MAX_RESULTS);

async function main(breachesUrl, maxResults) {
  const stats = await dataClassesStats(breachesUrl, maxResults);
  stats.forEach((r, idx) =>
    console.log(
      `${idx + 1}. ${r.Name} = ${Number(r.PwnCount).toLocaleString()}`
    )
  );
}
