// userModel.js
var mongoose = require('mongoose');
// Setup schema
var imageSizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    mode: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export ImageSize model
var ImageSize = module.exports = mongoose.model('imagesize', imageSizeSchema);
module.exports.get = function (callback, limit) {
    ImageSize.find(callback).limit(limit);
}