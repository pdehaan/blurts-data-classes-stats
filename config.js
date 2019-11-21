"use strict";

const convict = require("convict");

const config = convict({
  breachesUrl: {
    format: "url",
    default: "https://monitor.firefox.com/hibp/breaches",
    env: "BREACHES_URL",
    arg: "breachesUrl"
  },
  maxResults: {
    format: "int",
    default: 2000,
    env: "MAX_RESULTS",
    arg: "maxResults"
  },
  breachesSince: {
    format: String,
    default: "1970-01-01",
    env: "BREACHES_SINCE",
    arg: "breachesSince"
  }
});

// Perform validation
config.validate({ allowed: "strict" });

module.exports = Object.freeze(config.getProperties());
