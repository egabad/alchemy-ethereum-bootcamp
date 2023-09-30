const { assert } = require('chai');
const findMyBalance = require('./5findMyBalance')
const { PRIVATE_KEY, INITIAL_BALANCE } = require('../config'); // Missing

describe('findMyBalance', () => {
    it('should return an instance of Promise', () => {
        assert(findMyBalance(PRIVATE_KEY) instanceof Promise);
    });
    it('should resolve with the initial balance', async () => {
        const balance = await findMyBalance(PRIVATE_KEY);
        assert(INITIAL_BALANCE.eq(balance));
    });
});