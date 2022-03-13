const firebase = require("../utils/firebase/index");

const updatePolicyDataOnFirebase = async(firebaseDocId, dataObject) => {
    try{
        const { policyData, customerData } = dataObject;
        const policyDocRef = await firebase().firestore.collection('policy').doc(firebaseDocId).get();
        const policyDocData = policyDocRef.data();
        await firebase().firestore.collection('policy').doc(firebaseDocId).update({
            ...policyData
        });
        await policyDocData.userRef.update({ ...customerData });
        return { valid: true, message: "Updated data on firebase" };
    } catch(err){
        return { valid: false, message: "Failed to update data on firebase" };
    }

}

module.exports = updatePolicyDataOnFirebase;