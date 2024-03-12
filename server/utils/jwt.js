const jwt=require("jsonwebtoken");

exports.generateToken=(userID)=>{
return jwt.sign({id:userID}, process.env.JWT_SECRET_KEY);

}