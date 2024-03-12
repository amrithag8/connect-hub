const jwt=require("jsonwebtoken");

function checkAuth(req, res, next) {
  const verifyToken=jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
  // console.log("auth", verifyToken);
  if(!verifyToken){
    return res.status(401).json({message:"Not valid user"})
  }
  req.body.userID=verifyToken.id;
  next();
}

module.exports= checkAuth;
