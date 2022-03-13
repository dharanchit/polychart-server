const firebase = require("../utils/firebase/index");

const getPolicyDataBetweenMonthsFromFirebase = async (startMonth, endMonth) => {
  const policyRef = await firebase().firestore.collection("policy").get();
  const policyData = policyRef.docs.map((document) => ({
    id: document.id,
    dateOfPurchase: new Date(document.data().dateOfPurchase).getTime(),
    dataOfPurchaseInString: document.data().dateOfPurchase,
  }));
  const filteredDataInDateRange = policyData.filter(
    (doc) =>
      doc.dateOfPurchase >= startMonth.getTime() &&
      doc.dateOfPurchase <= endMonth.getTime()
  );
  return filteredDataInDateRange;
};

module.exports = getPolicyDataBetweenMonthsFromFirebase;
