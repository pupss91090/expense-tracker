const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const recordToCategory = require('../../recordToCategory')

// create
router.get('/new', (req, res) => {
    Category.find()
        .lean()
        .then(categorys => res.render('new', { categorys }))
})

// post create
router.post('/', (req, res) => {
    const userId = req.user._id
    const { name, date, categoryId, amount } = req.body
    const errors = []

    if (!name || !date || !categoryId || !amount) {
        errors.push({ message: 'All fields are required!' })
    } if (errors.length) {
        return res.render('new', {
            errors,
            name,
            date,
            categoryId,
            amount
        })
    }

    return Record.create({
        name,
        date,
        userId,
        categoryId,
        amount
    })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
    
})

// edit
router.get('/:id/edit', (req, res) => {
    const id = req.params.id

    return Promise.all([
        Category.find().lean(),
        Record.findById(id).lean()
    ])
        .then(([categorys, thisRecord]) => {
            const thisCgId = thisRecord.categoryId

            Category.findById(thisCgId)
                .lean()
                .then(thisCategory => {
                    return res.render('edit', { categorys, thisRecord, thisCategory })
                })
        })
        .catch(error => console.error(error))

})


// put edit 
router.put('/:id', (req, res) => {
    const id = req.params.id
    const edit = req.body

    return Record.findById(id)
        .then(record => {
            record.name = edit.name,
                record.date = edit.date,
                record.categoryId = edit.categoryId,
                record.amount = edit.amount
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

// delete record
router.delete('/:id', (req, res) => {
    const id = req.params.id

    return Record.findById(id)
        // .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

module.exports = router

