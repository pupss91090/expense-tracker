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
    const record = req.body
    // const thisCategory = []
    // let categoryImg = ''
    //     Category.findById(record.categoryId)
    //         .lean()
    //         .then(category => {
    //             return categoryImg = category.Img
    //         })

    // console.log(categoryImg)


    // Category.findById(record.categoryId)
    //     .lean()
    //     .then(category => {
    //         for (let i = 0; i < category.length; i++) {
    //             categoryPack.push(category[i])
    //         }
    //         return categoryPack
    //     })

    // console.log(categoryPack)

    return Record.create({
        name: record.name,
        date: record.date,
        userId: userId,
        categoryId: record.categoryId,
        // categoryImg: categoryImg,
        amount: record.amount
    })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

// edit
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    const categorys = []
    let thisRecord = ""
    let thisCategory = '' //*** 

    Category.find()
        .lean()
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                categorys.push(data[i])
            }
            return categorys
        })
        .catch(error => console.error(error))

    Record.findById(id)
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(data => {
            return thisRecord = data
        })
        .catch(error => console.error(error))

    return Category.findById(thisRecord.categoryId) //***
        .lean()
        .then(thisCategory => res.render('edit', { categorys, thisRecord, thisCategory }))
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

