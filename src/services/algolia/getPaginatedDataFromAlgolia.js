const algoliasearch = require("algoliasearch");
require("dotenv").config();

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const searchIndex = client.initIndex(process.env.ALGOLIA_INDEX);

const getPaginatedDataFromAlgolia = async (data) => {
  const { searchString, pageNo } = data;
  // For empty string it will show all the results
  const response = await searchIndex.search(searchString, {
    page: pageNo - 1,
    hitsPerPage: 10,
  });
  return response;
};

module.exports = getPaginatedDataFromAlgolia;
