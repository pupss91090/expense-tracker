const db = require('../../config/mongoose')
const Record = require('../category') 

const ctgy = ["家居物業","交通出行","休閒娛樂","餐飲食品","其他"]
const img = ["fa-house","fa-van-shuttle","fa-face-grin-beam","fa-utensils","fa-pen"]

// 連線成功
db.once('open', () => {
    for (let i = 0; i < 5; i++) {
        Record.create({ 
                name: `${ctgy[i]}`,
                img: `${img[i]}`
})
    }
    console.log('done!')
})