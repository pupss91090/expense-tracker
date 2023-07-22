const mongoose = require('mongoose') // 載入 mongoose
const Schema = mongoose.Schema
const recordSchema = new Schema({
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    date: {
        type: Date,
        required: true
    },
    categoryID: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
    // userId: {  // 加入關聯設定
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     index: true,
    // }
})
module.exports = mongoose.model('Record', recordSchema)