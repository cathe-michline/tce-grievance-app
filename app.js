if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require ('express');
const app = express();
const path = require ('path');
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/grievancesdatabase'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error : "));
db.once("open", () =>{
    console.log("Database Connected");
});

const grievanceSchema = new mongoose.Schema({
    firstname : {type :String},
    lastname : {type : String},
    regno : {type : String},
    department :{type : String},
    email : {type : String},
    phone : {type : String},
    Subject : {type : String},
    Qn1 : {type : String},
    Qn2 : {type : String},
    Qn3 : {type : String}
});

const Grievance = mongoose.model('Grievance',grievanceSchema);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) =>{
    res.render('login');
})

app.get('/home', (req,res)=>{
    res.render('index')
})

app.get('/profile', (req,res) =>{
    res.render('profile');
})

app.get('/about', (req,res) =>{
    res.render('about');
})

app.get('/makeGrievance',(req,res) =>{
    res.render('makeGrievance');
})

app.post('/profile', async(req,res) =>{
    const grievance = new Grievance(req.body);
    await grievance.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
            res.redirect('profile');
            console.log('Saved in DB');
        }
    });
});

app.get('/profile',(req,res) =>{
    res.render('profile');
})
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`Serving on port ${port}`);
})
