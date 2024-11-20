const until = require('selenium-webdriver/lib/until');
const waitMiliSec = {
  default: 5 * 1000, // todo 効いてない？
  long: 10 * 1000,
}

const self = {
  wait: async (driver, locator, waitLen = 'default') => {
    if (typeof locator === 'string') {
      return await driver.wait(until.urlIs(locator), waitMiliSec[waitLen]);
    }
    return await driver.wait(until.elementLocated(locator), waitMiliSec[waitLen]);
  },
  goTo: async (driver, url, locators = null) => {
    console.log('aaaaaaaaaaaaaaaaaaa');
    await driver.get(url);
    console.log('bbbbbbbbbbbbbbbbbbbbbb');
    await self.wait(driver, url);
    console.log('cccccccccccccccccccccccc');
    if (locators !== null) {
      const locator = locators[Object.keys(locators)[0]];
      return await self.wait(driver, locator, 'long');
    }
    return null;
  },
};
module.exports = self;
