const jwt = require('jsonwebtoken')

exports.checkAuthorization = (req, res, next) => {
    const { authorization } = req.headers
    
    if (!authorization) {
        res.status(401).json({ message: "failed login first" })
        return
    }

    const authSplit = authorization.split(' ')
    const [authType, authToken] = [
        authSplit[0],
        authSplit[1]
    ]

    if (authType !== 'Bearer') {
        res.status(401).json({ message: "invalid authorization" })
        return
    }

    try {
        const user = jwt.verify(authToken, process.env.SECRET_KEY)
        req.user = user.data
        next()
    } catch (error) {
        res.status(400).json({ message: `failed ${error.message}` })
    }
}
