const mongoose = require ("mongoose");
const { Schema } = mongoose;

const experienceSchema = new Schema({
  title : String,
  overview : String,
  order : Number
});

module.exports =  mongoose.model("Experience", experienceSchema);
