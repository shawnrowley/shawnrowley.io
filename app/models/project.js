const mongoose = require ("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: String,
  link: String,
  item: [skillSchema]
});

module.exports  = mongoose.model("Project", projectSchema);
