exports = module.exports = function(settings, client) {
  var KeyStore = require('./internals/keystore');
  
  
  settings = settings.isolate(this.baseNS);
  
  var options = {
    path: settings.get('keystore/path')
  };
  
  var keystore = new KeyStore(client, options);
  return keystore;
}

exports['@implements'] = 'http://i.bixbyjs.org/pki/KeyStore';
exports['@singleton'] = true;
exports['@require'] = [ 'http://i.bixbyjs.org/Settings', 'http://i.bixbyjs.org/opt/vault/Client/0' ];