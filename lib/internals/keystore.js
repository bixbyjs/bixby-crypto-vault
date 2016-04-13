var iso8601 = require('iso8601-convert');


function KeyStore(client) {
  this._client = client;
}

KeyStore.prototype.all = function(cb) {
  var self = this;
  this._client.read('secret/key?list=true', function(err, result) {
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
      
      self._client.read('secret/key/' + id, function(err, result) {
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

KeyStore.prototype.add = function(pair, cb) {
  var now = new Date();
  
  var record = {
    public_key: pair.publicKey,
    private_key: pair.privateKey,
    created_at: iso8601.fromDate(now)
  }
  
  this._client.write('secret/key/1', record, function(err, result) {
    if (err) { return cb(err); }
    return cb();
  });
}


module.exports = KeyStore;
