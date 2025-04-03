import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // get username from cookie's token
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Not authenticated!" });
  }

  // verify token using jwt
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      res.status(403).json({ message: "Token is invalid!" });
    }

    // if validation is successful, we can assign user's userId to request, `req`
    req.userId = payload.userId;
    next();
  });
};