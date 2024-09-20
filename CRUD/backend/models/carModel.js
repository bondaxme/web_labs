const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    owner_surname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
