const { createInterface } = require('readline');

async function main() {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const gameNum = await new Promise(resolve => {
    readline.question('Game #: ', resolve);
  });
  
  readline.close();

  if (['1', '2', '3', '4', '5'].includes(gameNum)) {
    await deploy(gameNum);
  } else {
    throw new Error('Invalid game number.');
  }
}

async function deploy(contractNumber) {
  const Game = await hre.ethers.getContractFactory(`Game${contractNumber}`);
  // if you need to add constructor arguments for the particular game, add them here:
  const game = await Game.deploy();
  console.log(`Game${contractNumber} deployed to address: ${game.address}`);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });