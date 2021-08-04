const bcrypt = require('bcryptjs')
const User = require('../modals/User')

module.exports.login = (req, res) => {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}

module.exports.register = async (req, res) => {

    const { email, password } = req.body
    console.log('email: ' + email);
    const candidate = await User.findOne({ email })

    if (candidate) {

        res.status(409).json({
            message: `Email: ${email} is already occupied`
        })

    } else {
        
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (error) {
            
        }

    }

}