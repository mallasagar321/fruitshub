const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  farmerId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title:             { type: String, required: true },
  emoji:             { type: String, default: '🍎' },
  category:          String,
  origin:            String,
  months:            String,
  description:       String,
  isSeasonal:        { type: Boolean, default: false, index: true },
  seasonalityMonths: [{ type: Number, min: 1, max: 12 }],
  costPrice:         Number,
  sellingPrice:      Number,
  platformMargin:    Number,
  imageURLs:         [String],
  isActive:          { type: Boolean, default: true },
}, { timestamps: true })

productSchema.index({ title: 'text' })

module.exports = mongoose.model('Product', productSchema)