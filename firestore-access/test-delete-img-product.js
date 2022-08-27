const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetials e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

//referência do produto
const productId = 'b430bNWapMDvlNb36bMP'

//uar o doc() pra pegar a collection categories e estanciar o produto
const productRef = db.collection('products').doc(productId)

        
        //caminho pra chegar em imgens
        db
        .collection('products')
        .doc(productId)
        .collection('images')
        .get()

        //
        .then(imgSnapshot => {

            //array que receber imgens pra serem deletadas
            const exclusoes = []

            //função com forEach pra empurrar cada img pra dentro do array exclusoes e deletar
          imgSnapshot.forEach(img => {
            //console.log(img.id)

            //forçando o codigo percorrendo todo o caminho pra apagar images
            exclusoes.push(db.collection('products').doc(productId).collection('images').doc(img.id).delete())
          })

          //retorn uma promessa que concatena todas as promessas
          return Promise.all(exclusoes)
        })
        .then(() => {
            return productRef.delete()
        })
        .then(()=> {
            console.log('everything was deleted')
        })
