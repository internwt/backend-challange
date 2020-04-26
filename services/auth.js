import jwt from 'jsonwebtoken'

class Auth {
    async  generateToken(user) {
        return await jwt.sign({ id: user.id }, "sunsey", {
            expiresIn: "1 week"
        })
    }
}

module.exports = new Auth()