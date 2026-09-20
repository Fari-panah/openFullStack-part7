const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    match: /^[a-zA-Z0-9_]+$/,///^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9_]+$/,  //the username must contain at least one lowercaseletter,one uppercase letter, at least one number,
    unique: true  // is not validation, in MongoDb create index

  },
  name: String,
  passwordHash: String,
  blogs: [
    {
    //each item in the array is an ObjectId, that is stored in mongoDb in collection.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})
//Mongoose converts your MongoDB document into JSON
//this function changes the output so you don’t expose sensitive fields.
//returnedObject: object that will be returned to the client
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)