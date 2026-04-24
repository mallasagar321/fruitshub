require('dotenv').config()
const mongoose = require('mongoose')
const Product  = require('./models/Product')

const FARMER_ID = new mongoose.Types.ObjectId()

const products = [
  { farmerId:FARMER_ID, title:'Nagpur Oranges',   emoji:'🍊', category:'Citrus',   origin:'Vidarbha, MH',  months:'Jan–Mar', isSeasonal:true,  seasonalityMonths:[1,2,3],            costPrice:28,  sellingPrice:40,  platformMargin:30 },
  { farmerId:FARMER_ID, title:'Kashmiri Apples',  emoji:'🍎', category:'Other',    origin:'Sopore, J&K',   months:'Sep–Nov', isSeasonal:true,  seasonalityMonths:[9,10,11],          costPrice:80,  sellingPrice:120, platformMargin:33 },
  { farmerId:FARMER_ID, title:'Alphonso Mango',   emoji:'🥭', category:'Tropical', origin:'Ratnagiri, MH', months:'Apr–Jun', isSeasonal:true,  seasonalityMonths:[4,5,6],            costPrice:110, sellingPrice:180, platformMargin:39 },
  { farmerId:FARMER_ID, title:'Cavendish Banana', emoji:'🍌', category:'Tropical', origin:'Jalgaon, MH',   months:'Year Round', isSeasonal:false, seasonalityMonths:[1,2,3,4,5,6,7,8,9,10,11,12], costPrice:18, sellingPrice:30, platformMargin:40 },
  { farmerId:FARMER_ID, title:'Coorg Lemons',     emoji:'🍋', category:'Citrus',   origin:'Coorg, KA',     months:'Year Round', isSeasonal:false, seasonalityMonths:[1,2,3,4,5,6,7,8,9,10,11,12], costPrice:32, sellingPrice:55, platformMargin:42 },
  { farmerId:FARMER_ID, title:'Nashik Grapes',    emoji:'🍇', category:'Other',    origin:'Nashik, MH',    months:'Jan–Mar', isSeasonal:true,  seasonalityMonths:[1,2,3],            costPrice:38,  sellingPrice:60,  platformMargin:37 },
  { farmerId:FARMER_ID, title:'HP Peaches',       emoji:'🍑', category:'Other',    origin:'Shimla, HP',    months:'Jul–Aug', isSeasonal:true,  seasonalityMonths:[7,8],              costPrice:55,  sellingPrice:90,  platformMargin:39 },
  { farmerId:FARMER_ID, title:'Dussehri Mango',   emoji:'🍈', category:'Tropical', origin:'Lucknow, UP',   months:'Jun–Jul', isSeasonal:true,  seasonalityMonths:[6,7],              costPrice:95,  sellingPrice:160, platformMargin:41 },
]

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({})
  await Product.insertMany(products)
  console.log('Seeded', products.length, 'products ✓')
  process.exit()
}).catch(err => { console.error(err); process.exit(1) })