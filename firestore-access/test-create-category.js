const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetialçs e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

//estanciando as collection usando a extenção doc()
const doc = db.collection('categories').doc()
//set o doc chama o doc e depois o then cria categoria via código la no firebase
doc.set({
    category: 'Category criada via código'
}).then(snap => {
    console.log(snap)
})