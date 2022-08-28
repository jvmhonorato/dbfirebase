const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetialçs e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

//estanciando as collection usando a extenção doc( o id da categoria que vou dar update)
const doc = db.collection('categories').doc('GSGNeRNyKEgrHzc5w4Uz')

//o doc chama  a categoria declarada o update  atualiza apenas o campo chamado
doc.update({
    //
    category: 'Nova categoria atualizada sem mecher no campo2!',
    campo2:'blululu'
}).then(snap => {
    console.log(snap)
})