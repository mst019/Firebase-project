const admin = require("../config/firebase-config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = "txrsplkg1234@QsdASXdfSRV094";

const decodeToken = (req, res, next) => {
  console.log("start verifying now...");
  //console.log(req.headers);
  const jwtToken = req.headers.authorization.split(" ")[1];

  // const decodeValue = await admin.auth().verifyIdToken(token);
  // if (decodeValue) {
  //   console.log("token valid");
  //   return next();

  //console.log("token: " + jwtToken);

  jwt.verify(jwtToken, secret, (err, user) => {
    if (err) {
      console.log("token no longer valid");
      return res.send("token no longer valid");
    }

    console.log("token valid");
    next();
  });

  //return res.status(200).send("Invalid token");
};

module.exports = decodeToken;
