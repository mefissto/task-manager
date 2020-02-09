const mongoose = require('mongoose');
const validator = require('validator');

const { dbName, connectionString } = require('../config');

mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
});

const me = new User(
  {
    name: 'Serhii',
    email: 'mike@gmail.com',
    password: 'passw4ord'
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const task = new Task(
  {
    description: 'Serhsome taskii'
  },
  { versionKey: false }
);

task
  .save()
  .then(success => console.log(success))
  .catch(err => console.log(err));

me.save()
  .then(success => console.log(success))
  .catch(err => console.log(err));
