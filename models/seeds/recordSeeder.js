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
            const categoriesId = []
            
            Category.find()
                .then(categorys => {                   
                    categorys.forEach(category => {
                        categoriesId.push(category._id)
                    })// 含有所有類別 _id 的 array
                    return Promise.all(Array.from(
                        { length: 10 },
                        (_, i) => Record.create({ name: `item-${i}`, date: '2023-07-22', userId, categoryId: categoriesId[Math.floor(i/2)] , amount: 10 * (i + 1) })
                    ))
                })
            })
        .then(() => {
            console.log('done.')
            // process.exit()
        })
})