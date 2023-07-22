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
    console.log('request:', req.body)
    const record = req.body

    return Record.create({
        name: req.body.item,
        date: req.body.date,
        categoryId: req.body.categoryId,
        amount: req.body.amount
    })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

// edit
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    const categorys = []
    const categoryName = recordToCategory(id)
    
    console.log(id)
    console.log(categoryName)
    Category.find()
        .lean()
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                categorys.push(data[i])
            }
            return categorys
        })

    Record.findById(id)
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        // .then(record => console.log(record))
        .then(record => res.render('edit', { record, categorys, categoryName }))
        .catch(error => console.error(error))
})

// put edit 
router.put('/:id', (req, res) => {
    const id = req.params.id
    const edit = req.body

    console.log('request:', req.body)

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
router.delete('/:id/', (req, res) => {
    const id = req.params.id

    return Record.findById(id)
        // .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

module.exports = router

