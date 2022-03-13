const updatePolicyDataOnFirebase = require("../dbOps/updatePolicyDataOnFirebase");
const updateDataOnAlgolia = require("./algolia/updateDataOnAlgolia");

const updateDataService = async(policyFirebaseId, modifiedData) => {
    const { valid, message } = await updatePolicyDataOnFirebase(policyFirebaseId, modifiedData);
    if(!valid){
        return { status: 500, message }
    }
    await updateDataOnAlgolia(policyFirebaseId, modifiedData);
    return { status: 200, message: 'Updated data on database' }
}

module.exports =updateDataService;