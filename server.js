const express = require('Express');
const app = express();


const bodyparser = require('body-parser');
const path = require('path');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));


const sql = require('msnodesqlv8');

const connstring = "server=.;Database=richcasino;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.post('/registeruser/', function(req, res){
    let name = req.body.username;
    let pass = req.body.password;
    let sqlstring = "INSERT INTO Users(username,password,balance) VALUES ('" + name + "','" + pass + "','0')";

    sql.query(connstring, sqlstring, function(err, res){
        
    })
})
app.post('/updateuser/', function(req, res){
    let name = req.body.username;
    let balance = req.body.balance;
    let sqlstring = "UPDATE Users SET balance = '" + balance + "' WHERE username = '" + name + "'";

    sql.query(connstring, sqlstring, function(err, res){
        
    })
})

app.get('/getusers/', function(req, res){
    let sqlString = "SELECT * from Users";
    let id = req.body.id;

    sql.query(connstring, sqlString, function(err, result){
        res.json(result);
    })
})

app.listen(8000);

console.log("nu körs skit");