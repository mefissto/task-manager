const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const tokenSignature = process.env.TOKEN_SIGNATURE;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, tokenSignature);

    // use string notation for searching for one token inside the array of tokens
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error({ error: 'Authentefication error' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }

};

module.exports = authMiddleware;
