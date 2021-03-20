var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vrSchema = new Schema({
    region_id: {type:mongoose.Schema.ObjectId},
    scene_name:String,
    image_file: String,
    left_name: String,
    up_name: String,
    right_name: String,
    down_name: String,
});

module.exports = mongoose.model('vrItem', vrSchema);