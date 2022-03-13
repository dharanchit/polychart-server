const getPolicyDataFromFirebase = require("../dbOps/getPolicyDataFromFirebase");

const getPolicyDataService = async( docId ) => {
    const { valid, data } = await getPolicyDataFromFirebase(docId);
    if(!valid) return { status: 500, message: "Something went wrong while fetching data" }
    return { status: 200, message: data }
}

module.exports = getPolicyDataService;