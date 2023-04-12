require('dotenv').config();
const mongoose = require("mongoose");
const url = process.env.DB_URL;

const connectToAtlas = async() => {
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connected to db!')
    } catch(e){
        console.error(e.message);
    }
}

module.exports = connectToAtlas
