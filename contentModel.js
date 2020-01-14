// userModel.js
var mongoose = require('mongoose');
// Setup schema
var contentSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Mixed,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Users model
var Content = module.exports = mongoose.model('content', contentSchema);
module.exports.get = function (callback, limit) {
    Content.find(callback).limit(limit);
}