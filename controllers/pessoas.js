
const index = async({ Pessoa }, req, res) => {
    //pagination
    const pecount = await Pessoa.findAndCountAll()
    const total = pecount.count

    const paginate = {
        pageSize: parseInt(req.query.pageSize) || 10,
        currentPage: req.query.page || 0
    }
    const offset = paginate.currentPage * paginate.pageSize
    const limit = paginate.pageSize
   
    const totalPages = parseInt(total/paginate.pageSize)
    

    const pessoas = await Pessoa.findAll({ offset, limit })

    res.render('pessoas/index', { 
        pessoas,
        pagination: {
            pages: totalPages,
            pageSize: paginate.pageSize,
            currentPage: parseInt(paginate.currentPage)
        }  
    })
}

const createForm = (req, res) => {
    res.render('pessoas/create')
}

const createProcess = async({ Pessoa }, req, res) => {
    await Pessoa.create(req.body)
    res.redirect('/pessoas')
}

const deleteOne = async({ Pessoa }, req, res) => {
    await Pessoa.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pessoas')
}

const editForm = async({ Pessoa }, req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id)
    res.render('pessoas/edit', { pessoa })
}

const editProcess = async({ Pessoa }, req, res) =>{
    await Pessoa.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pessoas')
}


module.exports = {
    index,
    createForm,
    createProcess,
    deleteOne,
    editForm,
    editProcess
}