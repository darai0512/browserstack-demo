const webdriver = require('selenium-webdriver');
const config = require(`./config/${process.env.NODE_ENV || 'development'}.json`);
const browserStackFlag = !!process.argv[2];

const capabilities = {
  'browserName' : 'safari', // 'Chrome'
}

const builder = new webdriver.Builder();
let driver;
if (browserStackFlag) {
  const {url, getConf} = require('./lib/browserStack');
  Object.assign(capabilities, getConf(config.browserstack.user, config.browserstack.key));
  driver = builder.usingServer(url).withCapabilities(capabilities).build();
} else {
  driver = builder.withCapabilities(capabilities).build();
}

const main = async () => {
  await driver.get(config.lpUrl);
  let nextElement = '#lp_header > div > div.btn_block > a.btn--lp.btn--border'
  await driver.wait(() => driver.isElementPresent(webdriver.By.css(nextElement), 3000));
  await driver.findElement(webdriver.By.css(nextElement)).click();
  await driver.findElement(webdriver.By.name('email')).sendKeys(config.user);
  await driver.findElement(webdriver.By.name('password')).sendKeys(config.password);
  await driver.findElement(webdriver.By.css('body > div.mod-login > div > form > div:nth-child(5) > input')).click();
  console.log(await driver.manage().getCookie('payjp'));
  driver.quit();
};

main().catch(console.error);
