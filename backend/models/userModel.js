const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    userName: {
        type: String,
        required: true
    },
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;