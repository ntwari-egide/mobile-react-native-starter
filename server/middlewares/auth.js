const jwt = require('jsonwebtoken')

function mustBeLoggedIn(req, res, next){
    // access heade token
    // const token = req.header('x-auth-token')
    const token = req.header('authorization');

    if(!token){
        res.send({
            status: '403',
            message: 'Access is Denied - Must be logged in'
        })
    }

    try{
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmFzZGZzYWRmIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY1NzEwODgzOX0.HG89deZ1XureF3msS1fyvOcz7d0zdR3zs88NPWyFWH0"

        const decoded = jwt.verify(token, 'secret123')
        
        // req.user = decoded;
        next();
    }catch(err){
        res.send({
            status: '400',
            message: 'Invalid Token'
        })
    }
}

module.exports = mustBeLoggedIn