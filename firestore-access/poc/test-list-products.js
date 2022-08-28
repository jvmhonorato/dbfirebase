const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetials e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

//uar o get() pra pegar a collection categories e estanciar
const products = db.collection('products').get()
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