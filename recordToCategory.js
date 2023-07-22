const express = require('express')
const Category = require('./models/category')
const Record = require('./models/record')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

function recordToCategory(recordId) {
    console.log(recordId)
    let categoryName = ""
    Record.findById(recordId)
        .lean()
        .then(record => {
            Category.findById(record.categoryId)
                .lean()
                .then(category => {
                    categoryName = category.name
                    console.log(categoryName)
                })
        })
    return categoryName
}

module.exports = recordToCategory
