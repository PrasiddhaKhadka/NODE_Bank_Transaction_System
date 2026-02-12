const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')


const UserSchema = mongoose.Schema({
    email:{
        type: String,
        required: [ true, "Email is required for creating a user" ],
        validate:{
            validator:validator.isEmail,
            message:'Please provide valid email',
        },
        lowercase: true,
        unique: [ true, "Email already exists." ] 
    },
    name: {
        type: String,
        required: [ true, "Name is required for creating an account" ]
    },
     password: {
        type: String,
        required: [ true, "Password is required for creating an account" ],
        minlength: [ 6, "password should contain more than 6 character" ],
        select: false
    },
    systemUser:{
        type: Boolean,
        default: false,
        select: false,
        immutable: true,
    }
},{
     timestamps: true
})


UserSchema.pre('save', async function () {

  if (!this.isModified('password')) return;

  const saltRound = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, saltRound)

})



UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch;
}


const userModel = mongoose.model('user',UserSchema)
module.exports = userModel
