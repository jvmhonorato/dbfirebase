const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetials e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

//categoria estanciada
const cat1 = 'GSGNeRNyKEgrHzc5w4Uz'
//criar referência entrea categoria estanciada em cat1 com a collection categories 
const catRef = db.collection('categories').doc(cat1)

//uar o where antes de pegar os dados com get pra fazer uma filtragem da categoria que dejeja retornar
const products = db
.collection('products')
//filtrar de categories o array o conteúdo de catRef
.where('categories','array-contains',catRef)
.get()
products.then(snapshot => {
    //verificar se está vazio
    console.log('is empty', snapshot.empty)

    //fundir consulta de dados snapshot com o forEach pra retornar dados de acordo com os comando de consulta abaixo
    snapshot.forEach(doc => {

        //com o uso do forEach pegar valor de cada dado pelo id
        console.log(doc.id, '=>',doc.data())
        
        //pegar images pelo id dentro de product atráves do get()
        db.collection('products')
        .doc(doc.id).collection('images')
        .get()

        //usar o forEach  mostrar no console pra cada image pelo id mostrar seu determinado valor
        .then(imgSnapshot => {
          imgSnapshot.forEach(img => {
            console.log('img ==> ', img.id,'=>', img.data())
          })
        })
    })
})