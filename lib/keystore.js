exports = module.exports = function(client) {
  var KeyStore = require('./internals/keystore');
  
  var keystore = new KeyStore(client);
  return keystore;
}

exports['@implements'] = 'http://i.bixbyjs.org/pki/KeyStore';
exports['@singleton'] = true;
exports['@require'] = [ 'http://i.bixbyjs.org/opt/vault/Client' ];
