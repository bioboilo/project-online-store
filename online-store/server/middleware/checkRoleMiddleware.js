const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, nest)   {
        if (req.method === "OPTIONS")   {
            nest()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer dthdfgjfhj
            if (!token) {
                return res.status(401).json({message: "Не авторизований"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role)   {
                return res.status(403).json({message: 'Не має доступу'})
            }
            req.user = decoded
            next()
        }   catch(e)    {
            res.status(401).json({message: "Не авторизований"})
        }
    };
}


