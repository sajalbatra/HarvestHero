import jwt from 'jsonwebtoken';

const secretKey = process.env.Secret_Key;

export const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization header is missing or invalid' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ message: 'User is not verified' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error in verifyUser middleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
