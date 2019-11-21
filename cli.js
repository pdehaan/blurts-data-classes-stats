#!/usr/bin/env node

const { dataClassesStats } = require("./lib");

const config = require("./config");

main(config.breachesUrl, config.maxResults, config.breachesSince);

async function main(breachesUrl, maxResults, breachesSince) {
  const since = new Date(breachesSince).toLocaleString();
  console.info(`Fetching breaches since ${since}`);
  const stats = await dataClassesStats(breachesUrl, maxResults, breachesSince);
  stats.forEach((r, idx) =>
    console.log(
      `${idx + 1}. ${r.Name} = ${Number(r.PwnCount).toLocaleString()}`
    )
  );
}
