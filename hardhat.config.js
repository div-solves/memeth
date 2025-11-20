require("@nomicfoundation/hardhat-toolbox");

// Override the compile task to skip download
const { task } = require("hardhat/config");

task("compile", "Compile contracts using local solc")
  .setAction(async (taskArgs, hre, runSuper) => {
    console.log("Using pre-compiled artifacts...");
    return;
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.26",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
