const randToken = require('rand-token');
const jwt = require('jsonwebtoken');

const options = {
  algorithm: 'HS256',
  expiresIn: '1h',
  issuer: 'ooeunz'
};



module.exports = {
  sign: async (user) => {
    const payload = {
      username: user.username,
      email: user.email
    };

    let token = null;
    await jwt.sign(payload, 'sadfsdaf', options, async (err, newToken) => {
      return newToken
    });
    return token;
  }
}