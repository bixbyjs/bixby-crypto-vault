exports = module.exports = function crypto_vault(id) {
  var map = {
    'keyring': './xom/keyring'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  container.add('keyring');
};
