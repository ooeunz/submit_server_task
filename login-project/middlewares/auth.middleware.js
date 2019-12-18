const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  // read the token from header or url 
  const token = req.headers['token'] || req.query.token;

  // token does not exist
  if(!token) {
    return res.json({
      success: 400,
      message: 'not logged in'
    });
  };

  // create a promise that decodes the token
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    console.log(`Middleware Error: Token Decode error!!! ${err}`);
    res.json({
      code: 403,
      message: `Middleware Error: Token Decode error!!! ${err}`
    });
  }
};
