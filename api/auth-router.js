const router = require('express').Router();
const bcrypt = require("bcryptjs")
const user = require("./item-model.js")
const { makeToken } = require("./middleware.js")




router.post('/register', async (req, res) => {
  try{
    const hash = bcrypt.hashSync(req.body.password,8)
    const newUser = await user.create({username:req.body.username,password:hash})
    res.status(201).json(newUser)
  }catch(e){
    res.status(500).json(`Server Error: ${e}`)
  }
});

router.post('/login', (req, res) => {
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

router.post("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err){
				next(err)
			} else {
				res.status(204).end()
			}
		})
		
	} catch (err) {
		next(err)
	}
})

module.exports = router