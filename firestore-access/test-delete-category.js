const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetialçs e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

const productId = 'GaTYcuKVJBS6trWr9CU3'

//estanciando as collection usando a extenção doc( o id da categoria que vou dar update)
const doc = db.collection('categories').doc(productId)

//o doc chama  a categoria declarada o delete  deleta apenas o campo chamado
doc.delete().then(snap => {
    console.log(snap)
})