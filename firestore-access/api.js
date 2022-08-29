const categories = require('./category')
const products = require('./products')

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

    // retornar 2 consultas após categorias declarada ou retornar vazio caso não haja


    /*await products.create({
      product: 'R1250',
      price: 79780,
      categories: ['0vSnH7lsI1jAUSYiMbU8']
    })*/
    await products.update('IXvxw3rswa5101kGQdfx',{
      product: 'Audi rs6',
      categories:['qtqV0I9EzkFHiQmY3Aer']
    })

    const cats = await categories.findAllPaginated({pageSize:2, startAfter:'Motos'})
    console.log(cats)

}
testes()




