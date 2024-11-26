const jwt = require('jsonwebtoken');

const payload = {
  userId: "12345",
  name: "RandomUser",
  exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expires in 1 hour
};

const secret = "your-secret-key"; // Replace with the key from openssl
const token = jwt.sign(payload, secret);

console.log(token);