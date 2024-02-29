const { createInterface } = require('readline');

async function main() {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const gameNum = await new Promise(resolve => {
    readline.question('Game #: ', resolve);
  });
  
  const contractAddress = await new Promise(resolve => {
    readline.question('Contract Address: ', resolve);
  });
  
  readline.close();

  if (['1', '2', '3', '4', '5'].includes(gameNum)) {
    // attach to the game
    const game = await hre.ethers.getContractAt(`Game${gameNum}`, contractAddress);

    let tx;
    switch(gameNum) {
      case '1':
        tx = await game.win(); break;
      case '2':
        await game.setX(25);
        await game.setY(25);
        tx = await game.win(); break;
      case '3':
        tx = await game.win(45); break;
      case '4':
        tx = await game.win(56); break;
      case '5':
        await game.giveMeAllowance(10000);
        await game.mint(10000);
        tx = await game.win(); break;
    }

    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    console.log(receipt);  
  } else {
    throw new Error('Invalid game number.');
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
