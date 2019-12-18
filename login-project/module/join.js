const { User } = require('../models');
const jwt = require('./jwt');
const nodemailer = require('nodemailer');

BASE_URI = 'http://localhost:3000'

module.exports = {
  checkExist: async (user) => {
    const savedUser = await User.findOne({ where: { email: user.email } });
    if (savedUser) {
      throw new Error('user exists');
    }
    return user;
  },

  // 가데이터 저장
  storeCache: (user) => {
    try {
      client.hmset(user.email, "username", user.username, "email", user.email, "password", user.password);
    } catch (err) {
      console.log('Redis store error!!!');
    }
    return user;
  },

  // 인증 이메일 전송
  sendEmail: (user) => {
    if (!user.username || !user.email) {
      return {
        code: 400, // Bad request
        message: 'username 또는 email이 없음.'
      };
    }
    
    // tranceporter initialization
    const tranceporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_EMAIL_PWD
      }
    });

    const token = jwt.sign(user.username, user.email);
    const html = 
    `<p>아래의 링크를 클릭해주세요!</p>
    <a href='${BASE_URI}/api/auth/emailAuthorization?email="${user.email}&token=${token.token}'>인증하기</a>`;

    const mailOptions = {
      from: process.env.HOST_EMAIL,
      to: user.email,
      subject: 'sending test',
      html: html
    };

    tranceporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(`Email Send: ${info.response}`);
    })
    return {
      code: 200,
      message: 'Send mail'
    };
  },

  // run when there is an error (username exists)
  onError: (error) => {
    return {
      code: 409,
      message: error.message
    }
  }
}