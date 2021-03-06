const axios = require("axios");

const config = require("./config");

module.exports = {
  dataClassesStats,
  getBreaches
};

async function dataClassesStats(
  breachesUrl = config.breachesUrl,
  maxResults = config.maxResults,
  breachesSince = config.breachesSince
) {
  const stats = new Map();
  const breaches = await getBreaches(breachesUrl, breachesSince);
  for (const breach of breaches) {
    breach.DataClasses.forEach(dataClass => {
      const current = stats.get(dataClass) || 0;
      stats.set(dataClass, current + breach.PwnCount);
    });
  }

  // 1. Convert the Map to an Array.
  const res = Array.from(stats)
    // 2. Convert from `[Name, PwnCount]` array structure to `{Name, PwnCount}` object structure.
    .map(([Name, PwnCount]) => ({ Name: Name.replace(/-/g, " "), PwnCount }))
    // 3. Sort items by breached accounts, in descending order.
    .sort(sortBreaches)
    // 4. Filter only the top X worst offenders.
    .slice(0, maxResults);

  return res;
}

function sortBreaches(breachA, breachB) {
  // Sort by total PwnCount then Name.
  const val = breachB.PwnCount - breachA.PwnCount;
  if (val === 0) {
    return String(breachA.Name).localeCompare(breachB.Name);
  }
  return val;
}

async function getBreaches(breachesUrl, breachesSince) {
  const breachesSinceTime = new Date(breachesSince).getTime();
  const breaches = await axios.get(breachesUrl);
  return breaches.data.filter(
    breach => new Date(breach.AddedDate).getTime() >= breachesSinceTime
  );
}
