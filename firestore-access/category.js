const db = require('./firestore')

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

//o delete será dinâmico passar o id no momento da chamada
const remove = async(id) =>{
const doc = db.collection('categories').doc(id)
await doc.delete()

}

const create = async(data) => {
    
const doc = db.collection('categories').doc()

await doc.set(data)

}

const update = async(id,data) => {
    const doc = db.collection('categories').doc(id)
    await doc.update(data)

}


module.exports = {
    findAll,
    remove,
    create,
    update
}
