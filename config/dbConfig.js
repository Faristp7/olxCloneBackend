import mongoose from "mongoose";

const db = process.env.MONGODB

function dbConfig(){
    mongoose.connect(db).then(result => {
        console.log(`db Connected on ${db}`);
    }).catch((err) => {
        console.log('yes here',err);
    })
}

export default dbConfig