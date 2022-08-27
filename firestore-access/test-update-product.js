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
const cat1 = '0vSnH7lsI1jAUSYiMbU8'

//criar referência entrea categoria estanciada em cat1 com a collection categories 
const catRef = db.collection('categories').doc(cat1)

//selecionado a collection products, capturando o id do  produto decalarado e estanciando em doc
const doc = db.collection('products').doc('3Tw6S7ar3PIHh48jQ1dS')

//update o doc passanod os novos valores
doc.update({
    product: 'Yamaha R1',
    price: 75000,
    //adicionado a referencia a categoria ao mesmo tempo que atualiza o produto usando um vetor array
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    categories2:admin.firestore.FieldValue.arrayUnion(cat1)
}).then(snap => {
    console.log(snap)
})