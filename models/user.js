const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

    firstName: {type: String, require: [true, 'Cannot leave firstName empty']},
    lastName: {type: String, require: [true, 'Cannot leave lastName empty']},
    email: {type: String, require: [true, 'Cannot leave email empty'], unique: true},
    password: {type: String, require: [true, 'Cannot leave password empty']}

});

// Replacing plaintext password with hashed pasword
userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        next();
    })
    .catch(err => next(err));

});


// Compare login password with hashed password
// in the database
userSchema.methods.comparePassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);