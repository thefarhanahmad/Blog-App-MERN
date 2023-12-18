const mongoose = require('mongoose')

function dbConnection(){
    mongoose.connect(process.env.DB_URL,{
        
            useNewUrlParser: true,
            useUnifiedTopology: true
          
    })
    .then(()=>{
        console.log("DB connected successfully")
    })
    .catch((err)=>{
        console.log("DB not connecting")
        console.log(err)
    })
}

module.exports = dbConnection;