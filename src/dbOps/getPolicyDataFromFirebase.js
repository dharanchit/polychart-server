const firebase = require("../utils/firebase/index");

const getPolicyDataFromFirebase = async(documentId) => {
    try{
        const policyRef = await firebase().firestore.collection('policy').doc(documentId).get();
        const policyData = policyRef.data();
        const userDocRef = await policyData.userRef.get();
        const userData = userDocRef.data();
        return { valid: true, data: {...policyData, ...userData} }
    } catch(err){
        return { valid: false, data: {} }
    }
}

module.exports = getPolicyDataFromFirebase;