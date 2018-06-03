module.exports = (models) =>
  (req, res, next) =>
    models.Skillset.findAll()
      .then(skillsets => res.render('pages/profile/student',
        {user: req.user, skillsets}))
      .catch(next);
