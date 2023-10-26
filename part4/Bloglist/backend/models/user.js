const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, requestObj) => {
    requestObj.id = requestObj._id;
    delete requestObj._id;
    delete requestObj.__v;
    delete requestObj.passwordHash;
  },
});

const User = new mongoose.model('User', userSchema)

module.exports = User