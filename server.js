const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();


//rest
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.get('/',(req,res) => {
    res.status(200).send(({
        message: "server running",

    }))
});

//port
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server Running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`.bgBlack.white)
});