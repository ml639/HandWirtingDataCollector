var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imagedataSchema = new Schema({
  name: String,
  imagebase46: String,
  identity: String,
  createdAt: { type: Date, default: Date.now }
});

imagedataSchema.methods.imagetag = function() {
  // add some stuff to the users name
  this.name = '<img>'+this.name + '</img>'; 

  return this.name;
};

var Imagedata = mongoose.model('Imagedata', imagedataSchema);

module.exports = Imagedata;

