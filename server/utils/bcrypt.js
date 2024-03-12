const bcrypt=require("bcrypt");
const SALT=10;


exports.generateHashPassword=async(password)=>{
    return bcrypt.hash(password, SALT);
}

exports.verifyHashedPassword=async(password, HashedPass)=>{
    return bcrypt.compare(password, HashedPass);
}