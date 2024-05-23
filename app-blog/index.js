const express=require('express');
require('dotenv').config();
const database = require('./src/database/db.config');
const employee = require('./src/api/models/employeeModel');
//const express=require('express');
const app=express();
const cors=require('cors');
app.set('secretKey', '{employee.id}');
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
database.mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
    }
    ).then(()=>{
        console.log('connected to database'); 
       })
       .catch(err => {
           console.log(err);
       }); 
       ;
app.get('/', (req, res)=>{
    res.send({message: 'Hello, Word!'});
})
require('./src/api/routes/routes')(app);
app.listen(process.env.PORT, ()=>{
    console.log ('listening on port', process.env.PORT);
});