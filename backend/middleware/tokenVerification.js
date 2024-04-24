const admin = require("../config/firebase-config");

const decodeToken = async (req, res, next) => {
  try {
    console.log("start verifying now...");
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];

    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      console.log("token valid");
      return next();
    }
    return res.status(200).send("Invalid token");
  } catch (err) {
    return res.status(500).send("Internal server error ");
  }
};

module.exports = decodeToken;
