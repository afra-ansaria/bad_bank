// setup server
// YOUR CODE
var express = require('express')
var app = express()

var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
var cors    = require('cors');
app.use(cors());

app.use(express.static('public'))

app.get('/', function(req, res){
    res.send('Hello World!')
})

app.listen(3000, function(){
    console.log("Running on port 3000")
})

app.use(express.static('public'))

db.defaults({ accounts: []}).write();
// setup directory used to serve static files
// YOUR CODE

// setup data store
// YOUR CODE

// required data store structure
// YOUR CODE
/*
{ 
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0,
         password    : '',
         transactions: []}
    ] 
}
*/


app.get('/account/create/:name/:email/:password', function (req, res) {

    // YOUR CODE
    // Create account route
    // return success or failure string
    var account = {
        "name": req.params.name,
        "email": req.params.email,
        "balance" : 0,
        "password"    : req.params.password,
        "transactions": []
    }
    db.get('accounts').push(account).write();
    console.log("Account created for the account ", account)
    res.send(account)
});

app.get('/account/login/:email/:password', function (req, res) {

    // YOUR CODE
    // Login user - confirm credentials
    // If success, return account object    
    // If fail, return null
    var email = req.params.email
    var password = req.params.password
    var account = db.get('accounts').find({email: email}).value()
    if(account.password==password){
        console.log("User logged in ", account)
        res.send(account)
    }else{
        console.log("Incorrect password ", password);
        res.status(404).send({"message": "Invalid credentials"})
    }
});

app.get('/account/get/:email', function (req, res) {

    // YOUR CODE
    // Return account based on email
    var email = req.params.email
    console.log("Get account for ", email)
    var account = db.get('accounts').find({email: email}).value()
    if(!account){
        res.status(404).send({"message": "No account found under this email"})
    }
    res.send(account)
});



app.get('/account/deposit/:email/:amount', function (req, res) {

    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
    var email = req.params.email
    var amount = Number(req.params.amount)
    console.log("Deposit on account ", email, "for ", amount)
    var account = db.get('accounts').find({email: email}).value()
    if(!account){
        console.log("No account found for ", email)
        res.status(404).send({"message": "No account found under this email"})
    }
    account.balance += amount
    var audit = {
        'type': 'deposit',
        'amount': amount,
        'balance': account.balance
    }
    account.transactions.push(audit)
    console.log("Updating the balance to ", account.balance)
    account = db.get('accounts').find({email: email}).assign(account).write()
    res.send(account)
});

app.get('/account/withdraw/:email/:amount', function (req, res) {

    // YOUR CODE
    // Withdraw amount for email
    // return success or failure string
    var email = req.params.email
    var amount = Number(req.params.amount)
    console.log("Withdraw on account ", email, "for ", amount)
    var account = db.get('accounts').find({email: email}).value()
    if(!account){
        res.status(404).send({"message": "No account found under this email"})
    }
    if(amount>account.balance){
        console.log("Not enough balance", account.balance)
        res.status(405).send({"message": "Not enough money in the account. Please try lower amounts"})
    }else{
    account.balance -= amount
    console.log("Updating the balance to ", account.balance)
    var audit = {
        'type': 'withdraw',
        'amount': amount,
        'balance': account.balance
    }
    account.transactions.push(audit)
    account = db.get('accounts').find({email: email}).assign(account).write()
    res.send(account)
    }
});

app.get('/account/transactions/:email', function (req, res) {

    // YOUR CODE
    // Return all transactions for account
    var email = req.params.email
    var account = db.get('accounts').find({email: email}).value()
    if(!account){
        console.log("No account found for ", email)
        res.status(404).send({"message": "No account found under this email"})
    }else{
    console.log("Sending all transactions for ", email)
    res.send(account.transactions)
    }
});

app.get('/account/balance/:email', function (req, res) {

    // YOUR CODE
    // Return account based on email
    var email = req.params.email
    console.log("Get account for ", email)
    var account = db.get('accounts').find({email: email}).value()
    if(!account){
        console.log("No account found for ", email)
        res.status(404).send({"message": "No account found under this email"})
    }
    console.log("Sending balance ", JSON.stringify(account.balance))
    res.send({'balance': Number(account.balance)})
});

app.get('/account/all', function (req, res) {

    // YOUR CODE
    // Return data for all accounts
    var accounts = db.get('accounts').value()
    console.log("Sending all accounts information", accounts)
    res.send(accounts)
});
