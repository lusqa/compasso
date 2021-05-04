const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    state: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

schema.index({ name: 1, state: 1 }, { unique: true })

module.exports = mongoose.model('City', schema, 'city')
