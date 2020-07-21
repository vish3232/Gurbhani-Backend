const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    price: { type: Number}
});

module.exports = mongoose.model('payments', paymentSchema);