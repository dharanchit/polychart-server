const admin = require('firebase-admin');
const serviceAccount = require('../../../service-acc.json');
require('dotenv').config();

const initialize = () => {
  if (!admin.apps.length > 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  const firestore = admin.firestore();
  const { FieldValue } = admin.firestore;
  return { firestore, FieldValue };
};

module.exports = initialize;
