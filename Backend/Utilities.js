const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function AuthenticationToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, return unauthorized status
  if (!token) {
    return res.status(401).json({ error: true, message: 'Token is missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_SECRET, (err, deocde) => {
    if (err) {
      return res.status(403).json({ error: true, message: 'Invalid or expired token' });
    }

    // Attach the verified user data (or token payload) to the request object
    req.user = deocde;
    next(); // Proceed to the next middleware or route handler
  });
}

function PasswordToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, return unauthorized status
  if (!token) {
    return res.status(401).json({ error: true, message: 'Token is missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_SECRET, (err, deocde) => {
    if (err) {
      return res.status(403).json({ error: true, message: 'Invalid or expired token' });
    }

    // Attach the verified user data (or token payload) to the request object
    req.user = deocde;
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = { AuthenticationToken,PasswordToken };
