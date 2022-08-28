const admin = require("firebase-admin");

//nome e caminho  da chave baixada
const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});