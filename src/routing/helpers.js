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
  },
  getInterviews: (models) => (req, res, next) => {
    let _interviews;

    models.Interview.findAll({
      where: {studentUserId: req.user.id},
      include: [{
        model: models.Fair,
        as: 'fair'
      }, {
        model: models.CompanyUser,
        as: 'companyUser'
      }]
    })
      .then(interviews => {
        _interviews = interviews;
        let interviewCompanies = interviews.map((interview) =>
          interview.companyUser.getCompany()
        );
        return Promise.all(interviewCompanies);
      })
      .then((companies) => {
        req.interviews = _interviews.map((interview, i) => {
          let newInt = Object.assign({}, interview);
          newInt.companyUser.company = companies[i];
          return newInt;
        });
        return next();
      })
      .catch(err => next(err));
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
