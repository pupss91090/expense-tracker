const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


// homepage
router.get('/', (req, res) => {
    const userId = req.user._id
    let totalAmount = 0
    const categorys = []

    Record.find({ userId: userId })
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        // .sort({ isDone: 'asc' })
        .then(records => {
            for (let i = 0; i < records.length; i++) {
                totalAmount += records[i].amount
            }
            return totalAmount
        })

    Category.find()
        .lean()
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                categorys.push(data[i])
            }
            return categorys
        })

    return Record.find({ userId: userId })
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(records => res.render('index', { records, categorys, totalAmount })) // 將資料傳給 index 樣板
        .catch(error => console.error(error))

})

router.get('/sort/:sortType', (req, res) => {
    const userId = req.user._id
    const categoryId = req.params.sortType
    let totalAmount = 0
    const categorys = []

    Category.find()
        .lean()
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                categorys.push(data[i])
            }
            return categorys
        })

    Category.find({ userId: userId, categoryId: categoryId })
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        // .sort({ isDone: 'asc' })
        .then(records => {
            for (let i = 0; i < records.length; i++) {
                totalAmount += records[i].amount
            }
            return totalAmount
        })

    Record.find({ userId: userId, categoryId: categoryId })
        .lean()
        .then(records => res.render('index', { records, categorys, totalAmount }))
}
)

module.exports = router