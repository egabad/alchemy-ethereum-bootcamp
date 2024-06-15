- Run the following to deploy the contracts to the localhost: 
```
npx hardhat ignition deploy ignition/modules/Storage.js
npx hardhat ignition deploy ignition/modules/ArbitraryStorage.js
```
- Change the contract addresses in `scripts/lookup.js` and then run `node scripts/lookup.js`.