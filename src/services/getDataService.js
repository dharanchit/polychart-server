const getPaginatedDataFromAlgolia = require("./algolia/getPaginatedDataFromAlgolia");

const getDataService = async(policyData) => {
    const data = await getPaginatedDataFromAlgolia(policyData);
    return { status: 200, data }
};

module.exports =getDataService;