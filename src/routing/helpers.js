const pages = {
  HOME_PAGE: '/',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  DASHBOARD: '/dashboard'
};

const redirects = {
  loginRedirect: pages.LOGIN,
  failureRedirect: pages.LOGIN,
  successRedirect: pages.DASHBOARD
};

module.exports = {
  pages,
  redirects,
  isAuthenticated: (req, res, next) => {
    if (req.user) {
      return next();
    }

    return res.redirect(redirects.loginRedirect);
  }
};
