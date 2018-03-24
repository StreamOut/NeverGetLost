var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GraphSchema   = new Schema({
    type: String,
    name: String,
    nbVertex: Number,
    edges: [{ s1 : Number, s2 : Number, weight : Number, way : Number }],
    directory: [{ name: String, occupant: String, s1: Number, s2: Number, distance: Number }]
});

module.exports = mongoose.model('Graph', GraphSchema);
