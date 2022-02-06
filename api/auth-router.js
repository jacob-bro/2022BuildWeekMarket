const router = require('express').Router();
const bcrypt = require("bcryptjs")
const User = require("../jokes/model")
const { makeToken } = require("../api/middleware.js")

const checkPayload = (req,res,next)=>{
  if(!req.body.username || !req.body.password){
    res.status(401).json("username and password required")
  }else{
    next()
  }
}


const checkUserInDB = async (req,res,next)=>{
  try{
    const rows = await User.findBy({username:req.body.username})
    if(!rows.length){
      next()
    }else{
      res.status(401).json("username taken")
    }
  }catch(e){
    res.status(401).json(`Server Error: ${e}`)
  }
}

const checkUserExists = async (req,res,next)=>{
  try{
    const rows = await User.findBy({username:req.body.username})
    if(rows.length){
      req.userData = rows[0]
      next()
    }else{
      res.status(401).json("invalid credentials")
    }
  }catch(e){
    res.status(401).json(`Server Error: ${e}`)
  }
}

router.post('/register',checkPayload,checkUserInDB, async (req, res) => {
  try{
    const hash = bcrypt.hashSync(req.body.password,8)
    const newUser = await User.add({username:req.body.username,password:hash})
    res.status(201).json(newUser)
  }catch(e){
    res.status(500).json(`Server Error: ${e}`)
  }
});

router.post('/login',checkUserExists,checkPayload, (req, res) => {
 let { username, password } = req.body

 User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user)
        res.status(200).json({ 
          message: `welcome, ${user.username}`, 
          token
        })
      } else {
        next({ status: 401, message: 'invalid credentials' })
      }
    })
    .catch(next)
});