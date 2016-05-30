exports = module.exports = function(client, settings) {
  var Keyring = require('../lib/keyring');
  
  
  settings = settings.isolate(this.baseNS);
  
  var options = {
    path: settings.get('keystore/path')
  };
  
  var keyring = new Keyring(client, options);
  return keyring;
}

exports['@implements'] = 'http://i.bixbyjs.org/crypto/Keyring';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/opt/vault/Client/0',
  'http://i.bixbyjs.org/Settings'
];
