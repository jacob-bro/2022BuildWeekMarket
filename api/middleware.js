const jwt = require("jsonwebtoken");


const makeToken = (user)=>{
    const payload = {
      subject: user.id,
      username: user.username,
      role: user.role
    }
    const options = {
      expiresIn: "600s"
    }
    return jwt.sign(payload, "secrethere" ,options)
  };
  


const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
      res.status(401).json("token required")
    }else{
      jwt.verify(token, "secrethere", (err,decoded)=>{
        if(err){
          res.status(401).json("token invalid" + err.message)
        }else{
          req.decodedToken = decoded
          next()
        }
      })
    }
  };

module.exports = {
    makeToken,
    restricted
};