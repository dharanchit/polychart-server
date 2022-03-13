const updateDataService = require("../services/updateDataService");

const updateDataController = async(req, res) => {
    try{
        const { objectID: firebaseDocId, modifiedData } = req.body;
        const updateDataServiceResult = await updateDataService(firebaseDocId, modifiedData);
        return res.status(updateDataServiceResult.status).send({ "data": updateDataServiceResult.data })
    } catch(err){
        console.error('error', err);
        return res.status(500).send({ "message": `Error occured while fetching policy list ${err}` })
    }
}

module.exports = updateDataController;