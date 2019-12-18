const { User } = require('../models');
const jwt = require('./jwt');
const bcrypt = require('bcrypt');

module.exports = {
  verify: async (user) => {
    try {
      const savedUser = await User.findOne({ where: { email: user.email }});
      if (!savedUser) {
        console.log('가입되지 않은 사용자입니다.');
        return {
          code: 400,
          message: '가입되지 않은 사용자입니다.'
        };
      }
      

      const result = await bcrypt.compare(user.password, savedUser.password);
      if (!result) {
        console.log('비밀번호가 일치하지 않습니다.');
        throw {
          code: 400,
          message: '비밀번호가 일치하지 않습니다.'
        };
      }
      // Success End Point
      return savedUser;
    } catch (err) {
      console.log(`LoginError: 로그인 중 Error 발생!!! code: ${err}`);
      return {
        code: 400,
        message: `LoginError: 로그인 중 Error 발생!!! code: ${err}`
      };
    }
  },

  createToken: async (user) => {
    try {
      return await jwt.sign(user);
      
    } catch (err) {
      console.log(`Login 후 Token 발행 중 Error 발생!!!: ${err}`);
      return {
        code: 400,
        message: `Login 후 Token 발행 중 Error 발생!!!: ${err}`
      }
    }
  },

  // error occured
  onError: (error) => {
    return {
      code: 403,
      message: `로그인 에러!!!:${error.message}`
    }
  }
}