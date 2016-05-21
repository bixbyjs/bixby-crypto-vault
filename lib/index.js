exports = module.exports = function pki_vault(id) {
  var map = {
    'keystore': './keystore'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  container.add('keystore');
};
