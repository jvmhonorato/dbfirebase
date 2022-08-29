const db = require('./firestore')
const admin = require('firebase-admin')


//READ
const findAll = async() => {
    const categoriesDB = await db.collection('categories').get()

if(categoriesDB.empty){
    return []
}
//pra retornar um vetor com todas as categorias e o id
const categories = []
categoriesDB.forEach(doc => {
    //empurra pra o array 
    categories.push({
        //spread operator pega o que já havia e espalha junto com o id do produtos
        ...doc.data(),
        id: doc.id
    })
})
return categories
}

//FILTER results
const findAllPaginated = async({pageSize=10, startAfter = ''}) => {
   
const categoriesDB = await db
            .collection('categories')
            .orderBy('category')
            .limit(pageSize+1)
            .startAfter(startAfter)
            .get()
            if(categoriesDB.empty){
                return {
                    data: [],
                    total:0
                }
            }
const categories = []
let total = 0
             categoriesDB.forEach(doc => {
                if(total < pageSize){
                categories.push({
               ...doc.data(),
               id: doc.id
               })
              }
               total++
            })
return {
   data: categories,
   total:categories.length,
   hasNext: total > pageSize,
   startAfter:total > pageSize ? categories[categories.length-1].category : ''
}
            

}

//DELETE
const remove = async(id) =>{
const doc = db.collection('products').doc(id)
await doc.delete()

}

//CREATE
// extrair categories de data
const create = async({categories,...data}) => {
    
const doc = db.collection('products').doc()
//usar o .map pra transformar o vetor categories que são strings pra categories que referenciam um documentos
const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat)
)

await doc.set({
    ...data,
    categories: categoriesRefs,
    categories2: categories
   

})

}
/*
const cat1 = 'GSGNeRNyKEgrHzc5w4Uz'
//criar referência entrea categoria estanciada em cat1 com a collection categories 
const catRef = db.collection('categories').doc(cat1)

//estanciando as collection usando a extenção doc()
const doc = db.collection('products').doc()
//set o doc chama o doc e depois o then cria categoria via código la no firebase
doc.set({
    product: 'Sofá',
    price: 1598,
    categories:[catRef],
    categories2:[cat1]
}).then(snap => {
    console.log(snap)
})
*/

//UPDATE
const update = async(id,{categories, ...data}) => {
    const categoriesRefs = categories.map(cat => db.collection('categories').doc(cat))
    const doc = db.collection('products').doc(id)
    await doc.update({
        ...data,
        categories:  admin.firestore.FieldValue.arrayUnion(...categoriesRefs),
        categories2: admin.firestore.FieldValue.arrayUnion(...categories)

    })

}




module.exports = {
    findAll,
    findAllPaginated,
    remove,
    create,
    update
}