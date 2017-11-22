const {ensureLoggedIn} = require("connect-ensure-login");

module.exports = {
  EnsureLoggedIn: ensureLoggedIn('../user/login'),
};
