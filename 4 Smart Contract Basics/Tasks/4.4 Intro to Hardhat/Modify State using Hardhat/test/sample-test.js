// import testing libraries: https://www.chaijs.com/guide/styles/ 
import { expect, assert } from 'chai';

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe('TestModifyVariable', function () {
  let contract;

  before(async function () {
    // this line creates an ethers ContractFactory abstraction:
    // https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory('ModifyVariable');
    // we then use the ContractFactory object to deploy an instance of the contract
    contract = await ModifyVariable.deploy(10, 'a');
    // wait for contract to be deployed and validated!
    await contract.deployed();
  });

  it('should change x to 1337', async function () {
    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();
    // getter for state variable x
    const newX = await contract.x();
    assert.equal(newX.toNumber(), 1337);
  });

  it('should change a to "b"', async function () {
    // modify x from 10 to 1337 via this function!
    await contract.modifyAString();
    // getter for state variable x
    const newA = await contract.a();
    assert.equal(newA, 'b');
  });
});