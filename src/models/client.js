const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    sex: {
      type: String,
      enum: ['M', 'F'],
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    age: {
      type: Date,
      required: true
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('Client', schema, 'client')
