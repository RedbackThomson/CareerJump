const Op = require('sequelize').Op;

getInterviewers = (models, req, res) =>
  models.CompanyUser.findAll({
    where: {companyId: req.user.company.id}
  });

/**
 * Gets all interviews for the given list of interviewers.
 * @param {Object[]} interviewers An array of interviewer models.
 * @returns {Promise} A promise that contains the list of interview models.
 */
getAllInterviews = (models, interviewers) => {
  userIds = interviewers.map(user => user.id);
  let _interviews;

  return models.Interview.findAll({
    where: {
      companyUserId: {
        [Op.or]: userIds
      }
    },
    include: [{
      model: models.Fair,
      as: 'fair'
    }, {
      model: models.StudentUser,
      as: 'studentUser'
    }]
  })
    .then(interviews => {
      _interviews = interviews;
      let interviewStudents = interviews.map((interview) =>
        interview.studentUser.getProfile()
      );
      return Promise.all(interviewStudents);
    })
    .then(profiles => {
      return _interviews.map((interview, i) => {
        let newInt = Object.assign({}, interview);
        newInt.studentUser.profile = profiles[i];
        return newInt;
      });
    });
};

module.exports = (models) =>
  (req, res) => {
    // Show a different dashboard to admins
    if (req.user.admin) {
      return getInterviewers(models, req, res)
        .then(interviewers => {
          req.interviewers = interviewers;
          return getAllInterviews(models, interviewers);
        })
        .then(interviews => {
          return res.render('pages/dashboard/company', {
            interviewers: req.interviewers,
            interviews: interviews
          });
        });
    }

    return getAllInterviews(models, [req.user])
      .then(interviews => {
        return res.render('pages/dashboard/company', {
          interviews: interviews
        });
      });
  };
