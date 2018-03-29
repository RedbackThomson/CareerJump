module.exports = (models) =>
  (req, res) => {
    return res.render('pages/dashboard/company', {interviews: req.interviews});
  };
