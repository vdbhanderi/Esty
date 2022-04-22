const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default:''
  },
  zip: {
    type: String,
    default:''
  },
  phone: {
    type: String,
    default:''
  },
  state: {
    type: String,
    default:''
  },
  address: {
    type: String,
    default:''
  },
//   currency: {
//     type: String,
//     default: 'USD',
//     required: true,
//   },
  firstname:{
    type: String,
    default:''
  },
  username:{
    type: String,
    default:''

  },
  city:{
    type: String,
    default:''
  },
  gender:{
    type: String,
    default:''
  },
  dob:{
    type: String,
    default:''
  },
  userImage: {
    type: String,
    default: 'https://testbucket9696.s3.us-east-2.amazonaws.com/userImages/default-pic.png',
  },
  favouriteIds: {
    type: Array,
    default:[]
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('users', usersSchema);