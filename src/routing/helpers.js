const pages = {
  HOME_PAGE: '/',
  LOGIN: '/auth/login',
  COMPANY_LOGIN: '/auth/login/company',
  LOGOUT: '/auth/logout',
  DASHBOARD: '/dashboard'
};

const redirects = {
  loginRedirect: pages.LOGIN,
  failureRedirect: pages.LOGIN,
  successRedirect: pages.DASHBOARD
};

const companyRedirects = {
  loginRedirect: pages.COMPANY_LOGIN,
  failureRedirect: pages.COMPANY_LOGIN,
  successRedirect: pages.DASHBOARD
};

module.exports = {
  pages,
  studentRedirects: redirects,
  companyRedirects: companyRedirects,
  isAuthenticated: (req, res, next) => {
    if (req.user) {
      return next();
    }

    return res.redirect(redirects.loginRedirect);
  },
  getInterview: (models, paramName) => (req, res, next) => {
    let _interview;

    models.Interview.findOne({
      where: {roomName: req.params[paramName]},
      include: [{
        model: models.Fair,
        as: 'fair'
      }, {
        model: models.CompanyUser,
        as: 'companyUser'
      }, {
        model: models.StudentUser,
        as: 'studentUser'
      }]
    })
      .then(interview => {
        _interview = interview;
        return interview.companyUser.getCompany();
      })
      .then((company) => {
        _interview.companyUser.company = company;
        return _interview.studentUser.getProfile();
      })
      .then((profile) => {
        _interview.studentUser.profile = profile;
        req.interview = _interview;
        return next();
      })
      .catch(err => next(err));
  }
};
