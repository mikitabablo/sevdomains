const mongoose = require('mongoose');

const hostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false
    },
});

module.exports = mongoose.model('Host', hostSchema);