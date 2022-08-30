const db = require('./firestore')
const admin = require('firebase-admin')


//READ
const findAll = async() => {
    const productsDB = await db.collection('products').get()

if(productsDB.empty){
    return []
}
//pra retornar um vetor com todas as categorias e o id
const products = []
productsDB.forEach(doc => {
    
    //empurra pra o array 
    products.push({
        //spread operator pega o que já havia e espalha junto com o id do produtos
        ...doc.data(),
        id: doc.id
        
    })
})
const products2 = []
for await(product of products){
   
    const imgs = []
    
    const imgsDB = await db
    .collection('products')
    .doc(product.id)
    .collection('images')
    .get()
    
      imgsDB.forEach(img => {
        imgs.push({
            ...img.data,
            id: img.id
        })
      })
      products2.push({
        ...products,
        imgs
      })
      return products2
    
}
products
return products
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
    const imgs = await db
    .collection('products')
    .doc(id)
    .collection('images')
    .get()
    const exclusoes = []
    imgs.forEach(img => {
        exclusoes.push(db.collection('products').doc(id).collection('images').doc(img.id).delete())
     })
     await Promise.all(exclusoes)

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

//ADD IMAGE
const addImage = async(id, data) => {
    


const imageRef = db
.collection('products')
.doc(id)
.collection('images')
.doc()

await imageRef.set(data)
}


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
    update,
    addImage
}