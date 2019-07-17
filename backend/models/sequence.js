var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({ 
    maxMovieId: {type: Number}
});

module.exports = mongoose.model('Sequence', schema);