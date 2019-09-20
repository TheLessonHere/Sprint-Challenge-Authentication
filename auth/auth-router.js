const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('./auth-helpers');
const restricted = require('./authenticate-middleware');
const generateToken = require('./generateToken');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log(user)

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "Server error adding user." });
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "Server error authenticating login." });
    });
});

module.exports = router;
