const mongoose = require ("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate');
const { Schema } = mongoose;

const userSchema = new Schema({
  username : String,
  email : {
    type: String,
  },
  password: {
    type: String,
    //required: true
  },
  googleId: String,
  githubId: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
