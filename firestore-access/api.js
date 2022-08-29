const categories = require('./category')

const testes = async() => {
  /* await categories.create({
        category:'Nova categoria organizada'
    })
   */
    //await categories.remove('6dcBl8BE8TBNbLAiOqF0')
  // await categories.update('qtqV0I9EzkFHiQmY3Aer',{category: 'categoria atualizada'})
   /* const cats = await categories
    .findAll()
    console.log(cats)*/
    const cats = await categories.findAllPaginated({pageSize:1, startAfter:'Motos'})
    console.log(cats)
}
testes()




