const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

const model = require('./models/index')

const pessoas = require('./routes/pessoas')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=> res.render('index'))
app.use('/pessoas', pessoas)

//{ force: true }
model.sequelize.sync().then(() => {
    app.listen(port, () => console.log('Server and DB online....'))
})

