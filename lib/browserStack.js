module.exports = {
  url: 'http://hub-cloud.browserstack.com/wd/hub',
  getConf: (user, key, localIdentifier = null) => {
    const bsConf = {
      'browserName' : 'safari', // 'Chrome'
      'browser_version' : '72',
      'os' : 'OS X',
      'os_version' : 'Mojave',
      'resolution' : '1024x768',
      'browserstack.user' : user,
      'browserstack.key' : key,
      'chromeOptions' : {
        'excludeSwitches' : ["disable-popup-blocking"]
      },
      'browserstack.safari.enablePopups' : 'true',
      'browserstack.networkLogs': 'true',
    };
    if (localIdentifier !== null) {
      bsConf['browserstack.local'] = 'true';
      bsConf['browserstack.localIdentifier'] = localIdentifier;
    }
    return bsConf;
  },
};
