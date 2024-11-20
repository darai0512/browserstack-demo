'use strict';

const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const urlMap = require('../../config/urlMap');
const util = require('./util');

Given('{string}画面において', async function(urlKey) {
  this.urlKey = urlKey;
  const {endpoint, locators} = urlMap[urlKey];
  await util.goTo(this.driver, this.domain + endpoint, locators);
})
When('{string}ボタンをクリックし(た)', async function(elementKey) {
  const locator = urlMap[this.urlKey].locators[elementKey];
  await this.driver.findElement(locator).click();
})
When('{string}画面に遷移し(た)', async function(urlKey) {
  this.urlKey = urlKey;
  const {endpoint} = urlMap[urlKey];
  await util.wait(this.driver, this.domain + endpoint);
})
When('{string}入力欄に{string}を入力し(た)', async function(elementKey, value) {
  const locator = urlMap[this.urlKey].locators[elementKey];
  await this.driver.findElement(locator).sendKeys(value);
})
Then('{word}の{string}に{string}と表示され(た)', async function(urlKey, elementKey, value) {
  const {locators} = urlMap[urlKey];
  const locator = locators[elementKey];
  const element = await util.wait(this.driver, locator);
  console.log(element); // webelement
  assert(element.getText() === value);
})
