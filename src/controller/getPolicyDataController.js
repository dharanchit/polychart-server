const getPolicyDataService = require("../services/getPolicyDataService");

const getPolicyDataController = async(req, res) => {
    try{
        const { docId } = req.query;
        const getPolicyDataServiceResult = await getPolicyDataService(docId);
        return res.status(getPolicyDataServiceResult.status).send({ data: getPolicyDataServiceResult.message });
    } catch(err){
        console.error('error', err);
        return res.status(500).send({ message: `Error occurred while fetching policy list ${err}` });
    }
}

module.exports = getPolicyDataController