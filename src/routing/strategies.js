module.exports = (models) => (req, res, next) => {
  const CompanyRouteStrategy = {
    dashboard: require('./company/dashboard')(models),
    profile: require('./company/profile')(models),
    support: require('./company/support')(models)
  };

  const StudentRouteStrategy = {
    dashboard: require('./student/dashboard')(models),
    profile: require('./student/profile')(models),
    support: require('./student/support')(models)
  };

  if (!req.user) {
    return next();
  }

  req.routeStrategy = req.user.isCompany ? CompanyRouteStrategy :
    StudentRouteStrategy;
  next();
};
