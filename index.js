const app = require("./app");
require('dotenv').config();

const PORT = process.env.PORT || 8089;

async function main(){
    try{
        app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    } catch(err){
        console.error('Error occurred while starting server', err);
    }
}

main();