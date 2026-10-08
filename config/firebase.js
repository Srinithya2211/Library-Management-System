const { initializeApp, cert } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");

const serviceAccount = require("../serviceAccountKey.json");

const app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://library-management-syste-eda25-default-rtdb.firebaseio.com/"
});

const db = getDatabase(app);

module.exports = db;