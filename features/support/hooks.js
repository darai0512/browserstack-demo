const {Before, After} = require('cucumber');
const webdriver = require('selenium-webdriver');
const config = require(`../../config/${process.env.NODE_ENV || 'development'}`);
// const browserStackPath = process.argv[2];

const capabilities = {
  'browserName' : 'safari', // 'Chrome'
}

const builder = new webdriver.Builder();
let driver;
if (typeof browserStackPath === 'string') {
  const {url, getConf} = require(browserStackPath);
  Object.assign(capabilities, getConf(config.browserstack.user, config.browserstack.key));
  driver = builder.usingServer(url).withCapabilities(capabilities).build();
} else {
  driver = builder.withCapabilities(capabilities).build();
}
// driver.manage().setTimeouts()

Before(function (scenario) {
  console.log(scenario.pickle.name);
  this.scenario = scenario;
  this.domain = config.domain;
  this.urlKey = null;
  this.driver = driver;
});
After(function(scenario, next) {
  // console.log(await this.driver.manage().getCookie('payjp'));
  return this.driver.quit().then(next);
});
