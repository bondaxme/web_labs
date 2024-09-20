const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

mongoose
    .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => {
        console.log(err)
    })


app.use('/auth', authRoutes);
app.use('/auth', userRoutes);

app.listen(3000, () => console.log('Server started'));