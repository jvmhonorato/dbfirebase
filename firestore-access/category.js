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
//pra testar
findAll().then(res => {
    console.log(res)
})
