const {getInterview} = require('../helpers');

module.exports = (models) =>
  (req, res, next) =>
    getInterview(models, req.params.roomName)
      .then((interview) => {
        return res.render('pages/room/company', {interview: interview});
      })
      .catch(next);