const db = require('./firestore')


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
            categories.then(snapshot => {
                console.log('is empty', snapshot.empty)
    
    let total = 0
    snapshot.forEach(doc => {
      if(total >pageSize){
       
        console.log(doc.id, '=>',doc.data())
      }
        total++
    })
    if(total >pageSize){
      console.log('hasNext')
    }else{
      console.log('doest have Next')
    }
})

}

//DELETE
const remove = async(id) =>{
const doc = db.collection('categories').doc(id)
await doc.delete()

}

//CREATE
const create = async(data) => {
    
const doc = db.collection('categories').doc()

await doc.set(data)

}

//UPDATE
const update = async(id,data) => {
    const doc = db.collection('categories').doc(id)
    await doc.update(data)

}


module.exports = {
    findAll,
    findAllPaginated,
    remove,
    create,
    update
}
