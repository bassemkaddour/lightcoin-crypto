let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0; 
    for (const key of this.transactions) {
      balance += key.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  
  isAllowed(value, balance) {
    return !(value < 0 && balance + value <= 0);
  }

  commit() {
    if (this.isAllowed(this.value, this.account.balance)) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
  
}

class Withdrawal extends Transaction {
  
  get value () {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value () {
    return this.amount;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('myface'); 
console.log('Starting balance: ', myAccount.balance)

t1 = new Withdrawal(60, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log('Balance:', myAccount.balance)

t2 = new Withdrawal(10, myAccount);
t2.commit();

console.log('Transaction 2:', t2);
console.log('Balance:', myAccount.balance)

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance)

t4 = new Withdrawal(1000, myAccount);
t4.commit();

console.log('Transaction 4:', t4);
console.log('Balance:', myAccount.balance)
