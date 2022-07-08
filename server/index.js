const dotenv = require('dotenv')
const mustBeLoggedIn =require ('./middlewares/auth.js');
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user.route')
const candidateRoutes = require('./routes/candidate.route')
const votedCandidateRoutes = require('./routes/voted-candidate.route')
const { Swaggiffy } = require('swaggiffy'); // Using require
new Swaggiffy().setupExpress(app).swaggiffy();


dotenv.config()
app.use(cors()) // Handle CORS
app.use(express.json()) // Parse Everything that comes as req.body json

const env = process.env.NODE_ENV || "development";

const DB_URL =  'mongodb+srv://ntwari:123@cluster0.y3jhx.mongodb.net/?retryWrites=true&w=majority'

console.log('Link: ' + DB_URL)

// Connect to MongoDB
mongoose.connect(DB_URL)
.then( () => console.log ("Connected to DB" )) 
.catch( (err) => console.error("Could not connect to MongoDB"))

// User Routes
app.use('/api/user', userRoutes);

// protected routes
app.use('/api/candidate', mustBeLoggedIn, candidateRoutes);

app.use('/api/voted-candidates',mustBeLoggedIn, votedCandidateRoutes);

// Welcome Route
app.get('/', (req,res) => {
    res.send('RWANDA NATIONAL COMMISSION (NEC) VOTING SYSTEM ࡙࡙࡙࡙࡙');
})

app.listen(3032, () => {
    console.log('Server Listening on Port 3032');
})