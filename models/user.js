
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    // there is no need of define password and username
    // because passwordLocalMongoose automatically add them
    email: {
        type: String,
        required: true
    }
});
userSchema.plugin(passportLocalMongoose);// automatically generate -> username, solting, hashpassword

module.exports = mongoose.model("User", userSchema);