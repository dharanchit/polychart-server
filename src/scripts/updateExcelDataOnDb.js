// Read Data From Excel and populate on database
const firebase = require('../utils/firebase/index');
const csv = require('csvtojson');

const filePath = `${__dirname}/insuranceClient.csv`;

async function main(){

const jsonArray = await csv().fromFile(filePath);

// Creates two collections users and policy -> User will have all the information regarding the customer and 
// policy will have everything related to particular policy. Policy document will have a reference with user document.

await Promise.all(
    jsonArray.map(async(element) => {
        const userData = {
            customerId: element['Customer_id'],
            customerGender: element['Customer_Gender'],
            customerIncome: element['Customer_Income group'],
            customerRegion: element['Customer_Region'],
            customerMaritalStatus: element['Customer_Marital_status'],
        };
        const userDoc = await firebase().firestore.collection('users').add(userData);
        const userPolicyInfo = {
            policyId: element['Policy_id'],
            dateOfPurchase: element['Date of Purchase'],
            fuel: element['Fuel'],
            vehicleSegment: element['VEHICLE_SEGMENT'],
            premium: element['Premium'],
            bodilyInjuryLiability: element['bodily injury liability'],
            personalInjuryLiability: element['personal injury protection'],
            propertyDamageLiability: element['property damage liability'],
            collision: element['collision'],
            comprehensive: element['comprehensive'],
            userRef: (await firebase().firestore.collection('users').doc(userDoc.id).get()).ref
        };
        const userPolicyDoc = await firebase().firestore.collection('policy').add(userPolicyInfo);
        console.log(`Created user doc with id ${userDoc.id} && userPolicyDoc with id ${userPolicyDoc.id}`);
    })
);
}

main();