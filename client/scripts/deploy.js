// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");




async function main() {
  
  const myContract = await ethers.deployContract("BitLogix");

  await myContract.waitForDeployment();

  console.log(`deployed to ${myContract.target}`);
  // myContract.getAddress().then(function(number){
  //   console.log(number)
  // })
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  