const express = require('express');
const Op = require('sequelize').Op;

const {isAuthenticated} = require('../helpers');

const router = express.Router();

module.exports = (models) => {
  router.get('/tags', (req, res, next) => {
    return models.Skillset.findAll({
      where: {name: {[Op.like]: `%${req.query.term}%`}}
    })
      .then(skillsets => res.json(skillsets.map(skill => skill.name)))
      .catch(next);
  });

  return router;
};
