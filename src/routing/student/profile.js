module.exports = (models) =>
  (req, res) =>
    models.Skillset.findAll()
      .then(skillsets => res.render('pages/profile',
        {user: req.user, skillsets}))
      .catch(next);
