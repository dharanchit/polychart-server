const { add } = require("date-fns");
const getPolicyDataBetweenMonthsFromFirebase = require("../dbOps/getPolicyDataBetweenMonthsFromFirebase");

const generateMonthlyOrderService = async (startMonth, endMonth) => {
  // convert time stamp to from frontend to IST format
  const formattedStartDateInIST = add(new Date(startMonth), { hours: 5, minutes: 30 });
  const formattedEndDateInIST = add(new Date(endMonth), { hours: 5, minutes: 30 });

  // Fetch filtered out documents within the time range
  const policyData = await getPolicyDataBetweenMonthsFromFirebase(
    formattedStartDateInIST,
    formattedEndDateInIST
  );
  const policyDataInDesiredFormat = policyData
    .sort(
      (a, b) =>
        new Date(a.dataOfPurchaseInString) - new Date(b.dataOfPurchaseInString)
    )
    .map((element) => {
      const policyDateInDateFormat = new Date(element.dataOfPurchaseInString);
      const policyMonth = (policyDateInDateFormat.getUTCMonth() + 1).toString();
      const policyYear = policyDateInDateFormat.getUTCFullYear().toString();
      return {
        policyDateInMMYY:
          (policyMonth.length === 1 ? "0" + policyMonth : policyMonth) +
          policyYear,
      };
    });
  let policyDataByCount = {};
  // Check if key exists in the object and append the number.
  // Key is month in MM format appended to YYYY string. (i.e, MMYYYY)
  policyDataInDesiredFormat.forEach((element) => {
    if (policyDataByCount[element.policyDateInMMYY] !== undefined) {
      policyDataByCount[element.policyDateInMMYY] += 1;
    } else {
      policyDataByCount[element.policyDateInMMYY] = 1;
    }
  });
  return { status: 200, message: policyDataByCount };
};

module.exports = generateMonthlyOrderService;
