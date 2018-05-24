getInterviewers = (models) => (req, res, next) => {
  models.CompanyUser.findAll({
    where: {companyId: req.user.company.id}
  }).then(interviewers => {
    req.interviewers = interviewers;
    next();
  }).catch(err => next(err));
};

module.exports = (models) =>
  (req, res) => {
    getInterviewers(models)(req, res, () => {
      return res.render('pages/dashboard/company', {
        interviewers: req.interviewers
      });
    });
  };
