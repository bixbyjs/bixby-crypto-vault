var path = require('canonical-path');
var iso8601 = require('iso8601-convert');


function KeyStore(client, options) {
  options = options || {};
  this._client = client;
  this._path = options.path || 'secret/keys';
}

KeyStore.prototype.add = function(pair, cb) {
  var now = new Date();
  
  var record = {
    public_key: pair.publicKey,
    private_key: pair.privateKey,
    created_at: iso8601.fromDate(now) // TODO: Allow this to be specified on the key, for import
  }
  
  this._client.write(path.join(this._path, '1'), record, function(err, result) {
    if (err) { return cb(err); }
    return cb();
  });
}

KeyStore.prototype.all = function(cb) {
  var self = this;
  this._client.read(this._path + '?list=true', function(err, result) {
    if (err) { return cb(err); }
    
    var keys = []
      , ids = result.data.keys
      , id
      , i = 0;
    
    (function iter(err) {
      if (err) { return cb(err); }
      
      id = ids[i++];
      if (!id) { // done
        return cb(null, keys);
      }
      
      self._client.read(path.join(self._path, id), function(err, result) {
        if (err) { return iter(err); }
        
        keys.push({
          id: id,
          publicKey: result.data.public_key,
          privateKey: result.data.private_key
        });
        iter();
      });
    })();
  })
}

KeyStore.prototype.query = function(options, cb) {
  console.log('KEYSTORE QUERY');
  console.log(options);
  
  this.all(function(err, keys) {
    if (err) { return cb(err); }
    return cb(null, keys[0]);
  });
};


module.exports = KeyStore;
