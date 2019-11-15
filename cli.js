#!/usr/bin/env node

const {dataClassesStats} = require("./lib");

main();

async function main(breachesUrl = process.env.BREACHES_URL) {
  const stats = await dataClassesStats(breachesUrl);
  stats.forEach((r, idx) =>
    console.log(
      `${idx + 1}. ${r.Name} = ${Number(r.PwnCount).toLocaleString()}`
    )
  );
}
