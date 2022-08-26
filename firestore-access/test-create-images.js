const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetialçs e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

//documento da collection estanciada
const productId = 'b430bNWapMDvlNb36bMP'
//criar referência entre a categoria estanciada em productId com a collection product e a collection images
const imageRef = db.collection('products').doc(productId).collection('images').doc()
imageRef.set({
    description:'my description',
    url:'my image url'
}).then(res => {
    console.log(res)
})
