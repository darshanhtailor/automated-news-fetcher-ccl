const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    source: String,
    title: {
        type: String,
        required: true,
    },
    description: String,
    url: String,
    imgUrl: String,
    publishedAt: {
        type: String,
        required: true,
    },
    content: String
});

module.exports = mongoose.model('News', newsSchema);
