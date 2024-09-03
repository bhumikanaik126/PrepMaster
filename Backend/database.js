const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin:QBnMQHxIN8ruZgZI@cluster0.4k28i.mongodb.net/PrepMaster");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:3,
        maxleength:15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength:15
    },
});

const User=mongoose.model('Users',userSchema);

module.exports={
    User
}