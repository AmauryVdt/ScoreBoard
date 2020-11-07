const mongoose = require('mongoose');

const schema  = mongoose.Schema({
    user : String,
    score : String
})

module.exports = mongoose.model('score', schema);