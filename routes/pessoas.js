const express = require('express')
const pessoasControler = require('../controllers/pessoas')
const model = require('../models/index')

const router = express.Router()

router.get('/', pessoasControler.index.bind(null, model.models))
router.post('/create', pessoasControler.createProcess.bind(null, model.models))
router.get('/create', pessoasControler.createForm)
router.get('/delete/:id', pessoasControler.deleteOne.bind(null, model.models))
router.post('/edit/:id', pessoasControler.editProcess.bind(null, model.models))
router.get('/edit/:id', pessoasControler.editForm.bind(null, model.models))

module.exports = router