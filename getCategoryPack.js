const express = require('express')
const Category = require('./models/category')
const Record = require('./models/record')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

function getCategoryPack(categoryId) {
    console.log(categoryId)
    const categoryPack = []
    Category.findById(categoryId)
        .lean()
        .then(category => {
            for (let i = 0; i < category.length; i++) {
                categoryPack.push(category[i])
            }
            return categoryPack
        })
    return categoryPack
}


module.exports = getCategoryPack
