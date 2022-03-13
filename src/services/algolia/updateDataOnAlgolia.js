const algoliasearch = require("algoliasearch");
require("dotenv").config();

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

const updateDataOnAlgolia = async( objectID, data ) => {
    const { policyData } = data;
    const object = {
        objectID,
        ...policyData,
    }
    return await index.partialUpdateObject(object);
}

module.exports = updateDataOnAlgolia;