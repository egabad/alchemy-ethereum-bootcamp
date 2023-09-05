class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        const spentInputUTXOs = this.inputUTXOs.filter(txo => txo.spent === true);
        if (spentInputUTXOs.length !== 0) throw new Error('An input TXO is already spent!');

        const inputTV = this.inputUTXOs.reduce((a, b) => a + b.amount, 0);
        const outputTV = this.outputUTXOs.reduce((a, b) => a + b.amount, 0);
        if (inputTV < outputTV) throw new Error('Not enough input TXOs value!');

        this.inputUTXOs = this.inputUTXOs.map(txo => txo.spent = true);
    }
}

module.exports = Transaction;