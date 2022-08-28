const mongoose = require('mongoose');
//Mongodb atlas database url
const mongoURI = "mongodb+srv://bandsaurabh:7AQ2c1QU2Gxb1rVC@cluster0.bjvzk.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { dbName:"Employees" })
    .then( () => {
      console.log('Connection to the Atlas Cluster is successful!')
    })
    .catch( (err) => console.error(err));
}

module.exports = connectToMongo;