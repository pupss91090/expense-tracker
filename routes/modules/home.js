const express = require('express')
const router = express.Router()

const Record = require('../../models/record') 



// homepage
router.get('/', (req, res) => {
    let totalAmount = 0

    Record.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    // .sort({ isDone: 'asc' })
    .then(records =>{
        for (let i = 0; i < records.length; i++) {
            totalAmount += records[i].amount 
        }
        return totalAmount
    })

    Record.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(records => res.render('index', { records,totalAmount })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) 
    
})


module.exports = router