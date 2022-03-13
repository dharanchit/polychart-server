const generateMonthlyOrderService = require("../services/generateMontlyOrderService");

const getMonthlyReportsController = async(req, res) => {
    try{
        const { startMonth, endMonth } = req.query;
        const generateMonthlyOrderServiceResult = await generateMonthlyOrderService(startMonth, endMonth);
        return res.status(generateMonthlyOrderServiceResult.status).send({ data: generateMonthlyOrderServiceResult.message });
    } catch(err){
        console.error(err);
        return res.status(500).send({ message: `Error occurred while generating report` });
    }
}

module.exports = getMonthlyReportsController;