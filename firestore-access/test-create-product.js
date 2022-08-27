const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetialçs e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

//categoria estanciada
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