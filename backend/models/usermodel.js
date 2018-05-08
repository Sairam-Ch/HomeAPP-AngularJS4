//Dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var  SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String
});

var loginSchema = new mongoose.Schema({
   email: String,
   password: String
})


UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

loginSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var userschema = mongoose.model('User', UserSchema, 'users');
var loginschema = mongoose.model('Login', loginSchema, 'users');

module.exports = {
    userschema:userschema,
    loginschema:loginschema,
}
// module.exports = mongoose.model('User', UserSchema);