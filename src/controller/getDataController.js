const getDataService = require("../services/getDataService");

const getDataController = async(req, res) => {
    try{
        const { searchString, pageNo } = req.query;
        const searchOptions = {
            searchString,
            pageNo
        }
        const getDataServiceResult = await getDataService(searchOptions);
        return res.status(getDataServiceResult.status).send({ "data": getDataServiceResult.data })
    } catch(err){
        console.error('error', err);
        return res.status(500).send({ message: `Error occured while fetching policy list ${err}` })
    }
}

module.exports = getDataController;