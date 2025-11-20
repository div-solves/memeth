const hre = require("hardhat");

async function main() {
  console.log("Deploying MemethPlatform...");

  const MemethPlatform = await hre.ethers.getContractFactory("MemethPlatform");
  const platform = await MemethPlatform.deploy();

  await platform.waitForDeployment();

  const address = await platform.getAddress();
  console.log(`MemethPlatform deployed to: ${address}`);

  // Add some initial memecoins for testing
  console.log("\nAdding initial memecoins...");
  
  const memecoins = [
    { symbol: "DOGE", name: "Dogecoin", price: hre.ethers.parseEther("0.0001") },
    { symbol: "SHIB", name: "Shiba Inu", price: hre.ethers.parseEther("0.00001") },
    { symbol: "PEPE", name: "Pepe", price: hre.ethers.parseEther("0.000001") },
  ];

  for (const coin of memecoins) {
    const tx = await platform.addMemecoin(coin.symbol, coin.name, coin.price);
    await tx.wait();
    console.log(`Added ${coin.symbol} (${coin.name}) at price ${hre.ethers.formatEther(coin.price)} ETH`);
  }

  console.log("\nDeployment complete!");
  console.log("\nContract address:", address);
  console.log("\nYou can interact with the contract using:");
  console.log(`npx hardhat console --network <network-name>`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
