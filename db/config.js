require('dotenv').config();

module.exports = {
  'development': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      }
    }
  },
  'test': {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      }
    }
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