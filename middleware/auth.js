const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined

  console.log(bearerHeader);
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    console.log(req.token );

    jwt.verify(req.token, 'secretKey', function(err, decoded) {
      if(err)
      {
        console.log(err);
        res.sendStatus(403);
      }
      else {
        req.user = decoded
      }
      });

    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

module.exports = verifyToken;
