const mongoose = require ("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema({
  name : String,
  description : String,
  level : Number,
  type : Number,
  graphic: String
});

module.exports = mongoose.model("Skill", skillSchema);
