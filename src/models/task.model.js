const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' // set reference to User model
    }
  },
  {
    timestamps: true // adds two new fields to the model 'createdAt' and 'updatedAt'
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
