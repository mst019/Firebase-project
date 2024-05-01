const jwt = require("jsonwebtoken");

const secret = "txrsplkg1234@QsdASXdfSRV094";

const decodeToken = (req, res, next) => {
  console.log("start verifying now...");

  const jwtToken = req.headers.authorization.split(" ")[1];

  jwt.verify(jwtToken, secret, (err, user) => {
    if (err) {
      console.log("token no longer valid");
      return res.send("token no longer valid");
    }

    console.log("token valid");
    next();
  });
};

module.exports = decodeToken;
