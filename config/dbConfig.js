import mongoose from "mongoose";

function dbConfig(){
    mongoose.connect('mongodb://127.0.0.1:27017/olxClone').then(result => {
        console.log("db Connected");
    }).catch((err) => {
        console.log('yes here',err);
    })
}

export default dbConfig