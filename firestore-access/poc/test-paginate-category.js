const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("./firestore.json");

//uni o admin com o cradetials e serviceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//estanciando admin com as credenciais em firestore() em db
const db = admin.firestore()

const pageSize = 1

//usar o get() pra pegar a collection categories e estanciar/ orderBy pra ordenar as category do db/ limit() limita a chamada/startAfter() buscar depois  do documento selecionado
const categories = db
.collection('categories')
.orderBy('category')
.limit(pageSize+1)
.startAfter('')
.get()
categories.then(snapshot => {
    //verificar se está vazio
    console.log('is empty', snapshot.empty)
    //fundir consulta de dados snapshot com o forEach pra retornar dados de acordo com os comando de consulta abaixo

    let total = 0
    snapshot.forEach(doc => {
      if(total >pageSize){
        //com o uso do forEach pegar valor de cada dado pelo id
        console.log(doc.id, '=>',doc.data())
      }
        total++
    })
    if(total >pageSize){
      console.log('hasNext')
    }else{
      console.log('doest have Next')
    }
})