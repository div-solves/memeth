const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const networkName = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("=".repeat(60));
  console.log("MEMETH Platform Deployment");
  console.log("=".repeat(60));
  console.log(`Network: ${networkName}`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address))} ETH`);
  console.log("=".repeat(60));

  // Deploy MemethPlatform
  console.log("\n📦 Deploying MemethPlatform contract...");
  const MemethPlatform = await hre.ethers.getContractFactory("MemethPlatform");
  const platform = await MemethPlatform.deploy();

  await platform.waitForDeployment();

  const address = await platform.getAddress();
  console.log(`✅ MemethPlatform deployed to: ${address}`);

  // Save deployment info
  const deploymentInfo = {
    network: networkName,
    contractAddress: address,
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save deployment info
  const deploymentFile = path.join(deploymentsDir, `${networkName}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`📝 Deployment info saved to: deployments/${networkName}.json`);

  // Add initial memecoins (only on testnets and local)
  if (networkName === "sepolia" || networkName === "baseSepolia" || networkName === "hardhat" || networkName === "localhost") {
    console.log("\n🪙 Adding initial memecoins for testing...");
    
    const memecoins = [
      { symbol: "DOGE", name: "Dogecoin", price: hre.ethers.parseEther("0.0001") },
      { symbol: "SHIB", name: "Shiba Inu", price: hre.ethers.parseEther("0.00001") },
      { symbol: "PEPE", name: "Pepe", price: hre.ethers.parseEther("0.000001") },
    ];

    for (const coin of memecoins) {
      const tx = await platform.addMemecoin(coin.symbol, coin.name, coin.price);
      await tx.wait();
      console.log(`   ✓ Added ${coin.symbol} (${coin.name}) at ${hre.ethers.formatEther(coin.price)} ETH`);
    }
  } else {
    console.log("\n⚠️  Skipping initial memecoins on mainnet");
    console.log("   Please add memecoins manually using the contract owner account");
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ Deployment Complete!");
  console.log("=".repeat(60));
  console.log(`Contract Address: ${address}`);
  console.log(`Network: ${networkName}`);
  console.log(`Block Explorer: ${getBlockExplorerUrl(networkName, address)}`);
  console.log("\nNext steps:");
  console.log(`1. Verify contract: npx hardhat verify --network ${networkName} ${address}`);
  console.log(`2. Interact with contract: npx hardhat console --network ${networkName}`);
  console.log(`3. Update frontend/.env with: NEXT_PUBLIC_CONTRACT_ADDRESS_${networkName.toUpperCase()}=${address}`);
  console.log("=".repeat(60) + "\n");
}

function getBlockExplorerUrl(network, address) {
  const explorers = {
    mainnet: `https://etherscan.io/address/${address}`,
    sepolia: `https://sepolia.etherscan.io/address/${address}`,
    base: `https://basescan.org/address/${address}`,
    baseSepolia: `https://sepolia.basescan.org/address/${address}`,
  };
  return explorers[network] || "N/A";
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
