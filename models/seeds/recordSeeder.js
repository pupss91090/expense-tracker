const db = require('../../config/mongoose')
const Record = require('../record') 

  
// 連線成功
db.once('open', () => {
    for (let i = 0; i < 10; i++) {
        Record.create({ 
                name: `name-${i}`,
                date:  '2023-07-22',
                categoryID: i/2+1,
                amount: 10*(i+1)
})
    }
    console.log('done!')
})

