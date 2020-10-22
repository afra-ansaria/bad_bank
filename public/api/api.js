// const superagent = require('superagent');

function create() {
    // -------------------------------------
    //  YOUR CODE
    //  Create user account on server
    // -------------------------------------    
    var name     = document.getElementById('name').value
    var email    = document.getElementById('email').value
    var password = document.getElementById('password').value 
    var create  = document.getElementById('create'); 

    var url = '/account/create/'+ name + '/' + email + '/' + password

    superagent.get(url)
        .end(function(err, res){
            if(err){
                console.log(err)
                create.innerHTML = 'Invalid Format. Please provide valid data';
            }else{
                console.log(res)
                create.innerHTML = 'Created Successful!';
            }
            setTimeout(function(){ create.innerHTML = '';},3000);
        })

}

function login() {
    // -------------------------------------
    //  YOUR CODE
    //  Confirm credentials on server
    // -------------------------------------
    var email    = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;  
    var url = '/account/login/' + email + '/' + password;
    var login  = document.getElementById('login'); 
    
    superagent
    .get(url)
    .end(function(err, res){
        if (err) {
            console.log(err);
            login.innerHTML = 'Invalid credentials';
        } else {
            if (res.body){
                console.log(res.body);
                login.innerHTML = 'Login Successful!';
            }
            else{
                console.log('Invalid credentials');
            }
        }
    });
}

function deposit() {
    // -------------------------------------
    //  YOUR CODE
    //  Deposit funds user funds on server
    // -------------------------------------
    var email   = document.getElementById('depositEmail').value;    
    var amount  = document.getElementById('depositAmount').value;
    var deposit  = document.getElementById('deposit');    
    var url = '/account/deposit/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log("Deposit Failed");
                deposit.innerHTML = JSON.stringify(res.body.message);
            } else {
                if (res.text){
                    console.log(res.text);
                    deposit.innerHTML = 'Deposit Success'
                }
                else{                    
                    console.log('Deposit Failed');
                    deposit.innerHTML = 'Deposit Failed';
                }
                setTimeout(function(){ deposit.innerHTML = '';},3000);
            }
        });
}

function withdraw() {
    // -------------------------------------
    //  YOUR CODE
    //  Withdraw funds user funds on server
    // -------------------------------------

    var email   = document.getElementById('withdrawEmail').value;    
    var amount  = document.getElementById('withdrawAmount').value;
    var withdraw  = document.getElementById('withdraw');
    var url = '/account/withdraw/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log("Withdraw Failed");
                console.log(err)
                withdraw.innerHTML = JSON.stringify(res.body.message);
            } else {
                if (res.text){
                    console.log(res.text);
                    withdraw.innerHTML = "Withdraw success!";
                }
                else{                    
                    console.log('Withdraw Failed');
                    withdraw.innerHTML = 'Withdraw Failed';
                }
                setTimeout(function(){withdraw.innerHTML = '';},3000);
            }
        });
}

function transactions() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all user transactions
    // -------------------------------------
    var email   = document.getElementById('transactionsEmail').value;  
    var url = '/account/transactions/' + email;
    var transactions  = document.getElementById('transactions');

    superagent
    .get(url)
    .end(function(err, res){
        var all_transactions = res.body
        if (err) {
            console.log(err)
            transactions.innerHTML = JSON.stringify(res.body.message);
        } else {
            if (all_transactions){
                console.log(res.text);
                if(transactions.length==0){
                    transactions.innerHTML = "No transactions yet"
                }else{
                    transactions.innerHTML = JSON.stringify(res.body);
                }
            }
            else{                    
                console.log('Something went wrong');
            }
            setTimeout(function(){transactions.innerHTML = '';},3000);
        }
    });
}

function balance() {
    // -------------------------------------
    //  YOUR CODE
    //  Get user balance
    // -------------------------------------
    var email   = document.getElementById('balanceEmail').value;  
    var url = '/account/balance/' + email;
    var balance  = document.getElementById('balance');
    superagent
    .get(url)
    .end(function(err, res){
        if (err) {
            console.log(err)
            balance.innerHTML = JSON.stringify(res.body.message);
        }
        else{   
            console.log("Response balance is ", res.body.balance)                 
            balance.innerHTML = JSON.stringify(res.body.balance)
        }
        // setTimeout(function(){balance.innerHTML = '';},3000);
    });
}

function allData() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all data
    // -------------------------------------
    var url = '/account/all'
    var allData  = document.getElementById('allData');
    superagent
    .get(url)
    .end(function(err, res){
        if (err) {
            console.log(err)
            allData.innerHTML = "Error while getting accounts. Please check console";
        }
        else{                    
            allData.innerHTML = JSON.stringify(res.body);
        }
        // setTimeout(function(){allData.innerHTML = '';},3000);
    });
}

