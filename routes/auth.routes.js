const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const config = require('config')
const User = require('../models/User')

const router = Router()

/*  /api/auth/register  */
router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum password length 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
                })
            }

            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'The selected email exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json({message: 'User created'})

        } catch (error) {
            res.status(500).json({message: 'Oops, something went wrong'})
        }
    })

/*  /api/auth/login  */
router.post(
    '/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Minimum password length 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Check email or password'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Check email or password'})
            }

            const token = jwt.sign(
               { userID: user.id },
               config.get('jwtSecret'),
               { expiresIn: '1h' }
            )

            res.json({ token, userID: user.id })

        } catch (error) {
            res.status(500).json({message: 'Oops, something went wrong'})
        }
    })

module.exports = router
