class TXO {
    constructor(owner, amount) {
        this.owner = owner;
        this.amount = amount;
        this.spent = false;
        this.fee = 0;
    }
    spend() {
        this.spent = true;
    }
}

module.exports = TXO;