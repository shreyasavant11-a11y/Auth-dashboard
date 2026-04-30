const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const verifyToken = require('../middleware/authMiddleware')  

router.post('/register', authController.register)
router.post('/login', authController.login)


router.get('/me', verifyToken, async (req, res) => {
    res.json({ message: 'Valid token!', userId: req.user.id })
})

module.exports = router