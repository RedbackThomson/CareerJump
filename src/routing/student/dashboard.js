getInterviews = (models) => (req, res, next) => {
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
};

module.exports = (models) =>
  (req, res) => {
    getInterviews(models)(req, res, () => {
      return res.render('pages/dashboard/student',
        {interviews: req.interviews});
    });
  };
