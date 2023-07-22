const db = require('../../config/mongoose')
const Record = require('../user') 

  
// 連線成功
db.once('open', () => {
    for (let i = 0; i < 10; i++) {
        Record.create({ 
                name: `user-${i}`,
                email: `useruser${i}@gmail.com`,
                password: `useruser${i}`
})
    }
    console.log('done!')
})