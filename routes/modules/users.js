const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// 引用 passport
const passport = require('passport')
const bcrypt = require('bcryptjs')  // 載入套件

router.get('/login', (req, res) => {
    res.render('login', {})
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
    req.logout() // Passport.js 提供的函式，會幫你清除 session
    req.flash('success_msg', 'You have been logged out.')
    res.redirect('/users/login')
})

router.get('/register', (req, res) => {
    res.render('register', {})
})

router.post('/register', (req, res) => {
    const errors = []
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: 'All fields are required!' })
    } if (password !== confirmPassword) {
        errors.push({ message: 'Incorrect confirmpassword!' })
    } if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }
    // 檢查使用者是否已經註冊
    User.findOne({ email: email })
        .then(user => {
            //若已註冊
            if (user) {
                errors.push({ message: 'Email already exists.' })
                return res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    confirmPassword
                })
            } else {
                console.log('new user!')
                req.flash('success_msg', 'Successful registration! Please login.')
                return bcrypt
                    .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
                    .then(salt => bcrypt.hash(password, salt))// 為使用者密碼「加鹽」，產生雜湊值
                    .then(hash => User.create({
                        name,
                        email,
                        password: hash // 用雜湊值取代原本的使用者密碼
                    }))
                    .then(() => res.redirect('/users/login'))
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})



module.exports = router