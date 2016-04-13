function KeyStore(client) {
  this._client = client;
}

KeyStore.prototype.add = function(pair, cb) {
  var record = {
    public: pair.publicKey,
    private: pair.privateKey
  }
  
  this._client.write('secret/key/1', record, function(err, result) {
    if (err) { return cb(err); }
    return cb();
  });
}


module.exports = KeyStore;
