const mongoose = require('mongoose') // 載入 mongoose
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  email: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  password: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})
module.exports = mongoose.model('User', userSchema)