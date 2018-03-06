require('dotenv').config();

module.exports = {
  'development': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres'
  },
  'test': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres'
  },
  'production': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      }
    }
  }
};
