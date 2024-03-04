require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workout')
const mongoose = require('mongoose')

const app = express() //express app


//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//route
app.use('/api/workout',workoutRoutes)



//connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,() => {
        console.log('connect to DB & listening on port:',process.env.PORT)
    })
})
.catch((error)=>{console.log(error)})


//listen for request


