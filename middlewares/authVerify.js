import jwt from "jsonwebtoken";

const authVerify = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({
      msg: "Token not found!",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({
      msg: error.message,
    });
  }
};

export default authVerify;
