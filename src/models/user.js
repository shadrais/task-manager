const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model('users',{
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    age: {
        type:Number,
        default:0,
        validate(value) {
            if(value<0) {
                throw new Error('Enter positive Age')
            }
        }
    },
    password: {
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value) {
            if(value==='password') {
                throw new Error('Choose Strong Password')
            }
        }
    }
})

module.exports = User