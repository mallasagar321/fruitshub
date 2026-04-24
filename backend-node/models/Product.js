const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  farmerId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:             { type: String, required: true },
  description:       String,
  category:          String,
  isSeasonal:        { type: Boolean, default: false, index: true },
  seasonalityMonths: [{ type: Number, min: 1, max: 12 }],
  costPrice:         Number,
  sellingPrice:      Number,
  platformMargin:    Number,
  imageURLs:         [String],
  isActive:          { type: Boolean, default: true },
}, { timestamps: true })

productSchema.index({ title: 'text' })  // enables text search

module.exports = mongoose.model('Product', productSchema)