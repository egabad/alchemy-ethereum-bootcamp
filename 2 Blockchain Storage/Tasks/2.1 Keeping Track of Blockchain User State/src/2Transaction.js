class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        const spentInputUTXOs = this.inputUTXOs.filter(txo => txo.spent === true);
        if (spentInputUTXOs.length !== 0) throw new Error('An input TXO is already spent!');
    }
}

module.exports = Transaction;