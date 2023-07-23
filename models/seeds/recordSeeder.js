const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const SEED_USER = {
    name: 'root',
    email: 'root@example.com',
    password: '12345678'
}

db.once('open', () => {
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
        }))
        .then(user => {
            const userId = user._id
            return Promise.all(Array.from(
                { length: 10 },
                (_, i) => Record.create({ name: `name-${i}`, userId, date: `2023-07-22`, categoryID: '64bb7fe56c7cdf874cd42e2d',amount: 10 * (i + 1) })
            ))
        })
        .then(() => {
            console.log('done.')
            process.exit()
        })
})

// // 連線成功
// db.once('open', () => {
//     for (let i = 0; i < 10; i++) {
//         Record.create({ 
//                 name: `name-${i}`,
//                 date:  '2023-07-22',
//                 categoryID: '64bb7fe56c7cdf874cd42e2d',
//                 amount: 10*(i+1)
// })
//     }
//     console.log('done!')
// })

