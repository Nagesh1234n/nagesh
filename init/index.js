// if(process.env.NODE_ENV != "production"){// curr-> dev phase
//     require('dotenv').config();
// }
const mongoose = require("mongoose");

const initData = require("./data.js");
const Listing = require("../models/listing.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
//const dbUrl = process.env.ATLASDB_URL;
// old const dbUrl = "mongodb+srv://nagesh-chhabile:vofKWZwVjYQ5K2Mw@cluster0.z6zr2wz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbUrl = "mongodb+srv://nageshchhabile23:aVZWDWAn6Ckao7aZ@cluster0.6blujxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    // await mongoose.connect(MONGO_URL);
     await mongoose.connect(dbUrl);
};

const initDB = async ()=>{
    await Listing.deleteMany({});// map create new array with owner property
    initData.data = initData.data.map((obj)=>({...obj, owner:"680a22f5cbd06f7ceec8c80d"}));
     await Listing.insertMany(initData.data);
    console.log("data was initialize");
}
initDB();