const { User } = require('../../models');
const jwt = require('../../module/jwt');
const join = require('../../module/join');
const login = require('../../module/login');

BASE_URI = 'http://localhost:3000'

/* 
  POST /auth/join
  {
    email,
    username,
    password
  }
*/

// JOIN MAIN LOGIC
exports.join = async (req, res) => {
  const user = req.body;  // { email, username, password }

  const result = await join.checkExist(user)
  .then(join.storeCache)
  .then(join.sendEmail)
  .catch(join.onError)

  res.json(result);

  // const tempUser = await join.checkExist(user);
  // const mail = await join.storeCache(tempUser)
  // const result = await join.checkExist(mail);
  
  // res.json(result);
};


// JOIN SERVE LOGIC
exports.emailAuthorization = async (req, res) => {
  const { email, token } = req.query;
  try {
    const result = jwt.verify(token);
    if (result) {
      client.hgetall(email, (err, obj) => {
        User.create({
          username: obj.username,
          email: obj.email,
          password: obj.password
        })
      });
      res.send({
        code: 200,
        message: '회원가입이 완료되었습니다.'
      })
    }
  } catch (err) {
    console.log(`Error: Email 인증하기 에러 / ${err}`);
  }
}

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/

exports.login = async (req, res) => {
  const {email, password} = req.body;
  const result = await login.verify({ email, password })
    .then(login.createToken)
    .catch(login.onError)
  
  res.json(result);
}