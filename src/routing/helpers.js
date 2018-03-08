const redirects = {
  loginRedirect: '/login',
  failureRedirect: '/failed',
  successRedirect: '/dashboard'
};

module.exports = {
  redirects,
  isAuthenticated: (req, res, next) => {
    if (req.user) {
      req.user.authenticated = true;
      return next();
    }

    return res.redirect(redirects.loginRedirect);
  }
};
