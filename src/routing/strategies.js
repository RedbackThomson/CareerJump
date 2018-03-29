module.exports = (models) => (req, res, next) => {
  const CompanyRouteStrategy = {
    dashboard: require('./company/dashboard')(models)
  };

  const StudentRouteStrategy = {
    dashboard: require('./student/dashboard')(models)
  };

  if (!req.user) {
    return next();
  }

  req.routeStrategy = req.user.isCompany ? CompanyRouteStrategy :
    StudentRouteStrategy;
  next();
};
