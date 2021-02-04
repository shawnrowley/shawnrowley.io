const mongoose = require ("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate');
const { Schema } = mongoose;

const userSchema = new Schema({
  email : String,
  password: String,
  googleId: String,
  githubId: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
