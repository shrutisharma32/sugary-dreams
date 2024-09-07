import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
    },
    image: {type: String},
    
}, { timestamps: true });

// UserSchema.post('validate', function(user){

//     // const salt = bcrypt.genSaltSync(10);
//     // const notHashedPassword = user.password;
//     // user.password = bcrypt.hashSync(notHashedPassword, salt);
// })

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;