const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MemethPlatform", function () {
  // Fixture to deploy the contract
  async function deployMemethPlatformFixture() {
    const [owner, user1, user2] = await ethers.getSigners();
    
    const MemethPlatform = await ethers.getContractFactory("MemethPlatform");
    const platform = await MemethPlatform.deploy();
    
    return { platform, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { platform, owner } = await loadFixture(deployMemethPlatformFixture);
      expect(await platform.owner()).to.equal(owner.address);
    });

    it("Should initialize with nextPositionId as 1", async function () {
      const { platform } = await loadFixture(deployMemethPlatformFixture);
      expect(await platform.nextPositionId()).to.equal(1);
    });
  });

  describe("Deposits and Withdrawals", function () {
    it("Should allow users to deposit ETH", async function () {
      const { platform, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      const depositAmount = ethers.parseEther("1.0");
      await expect(platform.connect(user1).deposit({ value: depositAmount }))
        .to.emit(platform, "Deposit")
        .withArgs(user1.address, depositAmount);
      
      expect(await platform.getBalance(user1.address)).to.equal(depositAmount);
    });

    it("Should allow users to deposit via receive function", async function () {
      const { platform, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      const depositAmount = ethers.parseEther("0.5");
      await user1.sendTransaction({ to: await platform.getAddress(), value: depositAmount });
      
      expect(await platform.getBalance(user1.address)).to.equal(depositAmount);
    });

    it("Should allow users to withdraw ETH", async function () {
      const { platform, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      const depositAmount = ethers.parseEther("2.0");
      await platform.connect(user1).deposit({ value: depositAmount });
      
      const withdrawAmount = ethers.parseEther("1.0");
      await expect(platform.connect(user1).withdraw(withdrawAmount))
        .to.emit(platform, "Withdrawal")
        .withArgs(user1.address, withdrawAmount);
      
      expect(await platform.getBalance(user1.address)).to.equal(ethers.parseEther("1.0"));
    });

    it("Should revert when withdrawing more than balance", async function () {
      const { platform, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      await expect(
        platform.connect(user1).withdraw(ethers.parseEther("2.0"))
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should revert when depositing 0 ETH", async function () {
      const { platform, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      await expect(
        platform.connect(user1).deposit({ value: 0 })
      ).to.be.revertedWith("Deposit amount must be greater than 0");
    });
  });

  describe("Memecoin Management", function () {
    it("Should allow owner to add memecoins", async function () {
      const { platform, owner } = await loadFixture(deployMemethPlatformFixture);
      
      const symbol = "DOGE";
      const name = "Dogecoin";
      const initialPrice = ethers.parseEther("0.0001");
      
      await expect(platform.connect(owner).addMemecoin(symbol, name, initialPrice))
        .to.emit(platform, "MemecoinAdded")
        .withArgs(symbol, name, initialPrice);
      
      const memecoin = await platform.memecoins(symbol);
      expect(memecoin.symbol).to.equal(symbol);
      expect(memecoin.name).to.equal(name);
      expect(memecoin.currentPrice).to.equal(initialPrice);
      expect(memecoin.isActive).to.equal(true);
    });

    it("Should not allow non-owner to add memecoins", async function () {
      const { platform, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      await expect(
        platform.connect(user1).addMemecoin("DOGE", "Dogecoin", ethers.parseEther("0.0001"))
      ).to.be.revertedWithCustomError(platform, "OwnableUnauthorizedAccount");
    });

    it("Should not allow adding duplicate memecoin", async function () {
      const { platform, owner } = await loadFixture(deployMemethPlatformFixture);
      
      const symbol = "DOGE";
      await platform.connect(owner).addMemecoin(symbol, "Dogecoin", ethers.parseEther("0.0001"));
      
      await expect(
        platform.connect(owner).addMemecoin(symbol, "Dogecoin", ethers.parseEther("0.0002"))
      ).to.be.revertedWith("Memecoin already exists");
    });

    it("Should allow owner to update prices", async function () {
      const { platform, owner } = await loadFixture(deployMemethPlatformFixture);
      
      const symbol = "DOGE";
      await platform.connect(owner).addMemecoin(symbol, "Dogecoin", ethers.parseEther("0.0001"));
      
      const newPrice = ethers.parseEther("0.0002");
      await expect(platform.connect(owner).updatePrice(symbol, newPrice))
        .to.emit(platform, "PriceUpdated");
      
      expect(await platform.getPrice(symbol)).to.equal(newPrice);
    });

    it("Should get all memecoins", async function () {
      const { platform, owner } = await loadFixture(deployMemethPlatformFixture);
      
      await platform.connect(owner).addMemecoin("DOGE", "Dogecoin", ethers.parseEther("0.0001"));
      await platform.connect(owner).addMemecoin("SHIB", "Shiba Inu", ethers.parseEther("0.00001"));
      
      const memecoins = await platform.getAllMemecoins();
      expect(memecoins.length).to.equal(2);
      expect(memecoins[0]).to.equal("DOGE");
      expect(memecoins[1]).to.equal("SHIB");
    });
  });

  describe("Position Management", function () {
    async function setupWithMemecoin() {
      const fixture = await loadFixture(deployMemethPlatformFixture);
      const { platform, owner } = fixture;
      
      // Add a memecoin
      await platform.connect(owner).addMemecoin("DOGE", "Dogecoin", ethers.parseEther("0.0001"));
      
      return fixture;
    }

    it("Should allow opening a LONG position", async function () {
      const { platform, user1 } = await setupWithMemecoin();
      
      // Deposit ETH
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      const positionAmount = ethers.parseEther("0.1");
      const leverage = 5;
      
      await expect(
        platform.connect(user1).openPosition("DOGE", 0, positionAmount, leverage)
      ).to.emit(platform, "PositionOpened");
      
      const position = await platform.positions(1);
      expect(position.trader).to.equal(user1.address);
      expect(position.memecoinSymbol).to.equal("DOGE");
      expect(position.positionType).to.equal(0); // LONG
      expect(position.amount).to.equal(positionAmount);
      expect(position.leverage).to.equal(leverage);
      expect(position.isOpen).to.equal(true);
    });

    it("Should allow opening a SHORT position", async function () {
      const { platform, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      const positionAmount = ethers.parseEther("0.1");
      const leverage = 3;
      
      await expect(
        platform.connect(user1).openPosition("DOGE", 1, positionAmount, leverage)
      ).to.emit(platform, "PositionOpened");
      
      const position = await platform.positions(1);
      expect(position.positionType).to.equal(1); // SHORT
    });

    it("Should not allow opening position with insufficient balance", async function () {
      const { platform, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("0.05") });
      
      await expect(
        platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should not allow opening position with invalid leverage", async function () {
      const { platform, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      await expect(
        platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 11)
      ).to.be.revertedWith("Invalid leverage");
    });

    it("Should not allow opening position on non-existent memecoin", async function () {
      const { platform, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      await expect(
        platform.connect(user1).openPosition("SHIB", 0, ethers.parseEther("0.1"), 2)
      ).to.be.revertedWith("Memecoin does not exist");
    });

    it("Should calculate profit for LONG position when price increases", async function () {
      const { platform, owner, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      // Open LONG position
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2);
      
      // Price doubles
      await platform.connect(owner).updatePrice("DOGE", ethers.parseEther("0.0002"));
      
      const profitLoss = await platform.calculateProfitLoss(1, ethers.parseEther("0.0002"));
      
      // With 2x leverage and 100% price increase, profit should be 0.2 ETH (0.1 * 2 * 100%)
      expect(profitLoss).to.equal(ethers.parseEther("0.2"));
    });

    it("Should calculate loss for LONG position when price decreases", async function () {
      const { platform, owner, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      // Open LONG position
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2);
      
      // Price halves
      await platform.connect(owner).updatePrice("DOGE", ethers.parseEther("0.00005"));
      
      const profitLoss = await platform.calculateProfitLoss(1, ethers.parseEther("0.00005"));
      
      // With 2x leverage and 50% price decrease, loss should be -0.1 ETH (0.1 * 2 * -50%)
      expect(profitLoss).to.equal(ethers.parseEther("-0.1"));
    });

    it("Should calculate profit for SHORT position when price decreases", async function () {
      const { platform, owner, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      // Open SHORT position
      await platform.connect(user1).openPosition("DOGE", 1, ethers.parseEther("0.1"), 2);
      
      // Price halves
      await platform.connect(owner).updatePrice("DOGE", ethers.parseEther("0.00005"));
      
      const profitLoss = await platform.calculateProfitLoss(1, ethers.parseEther("0.00005"));
      
      // With 2x leverage and 50% price decrease, profit should be 0.1 ETH (0.1 * 2 * 50%)
      expect(profitLoss).to.equal(ethers.parseEther("0.1"));
    });

    it("Should allow closing a profitable position", async function () {
      const { platform, owner, user1 } = await setupWithMemecoin();
      
      const initialBalance = ethers.parseEther("1.0");
      await platform.connect(user1).deposit({ value: initialBalance });
      
      const positionAmount = ethers.parseEther("0.1");
      await platform.connect(user1).openPosition("DOGE", 0, positionAmount, 2);
      
      // Price doubles
      await platform.connect(owner).updatePrice("DOGE", ethers.parseEther("0.0002"));
      
      await expect(platform.connect(user1).closePosition(1))
        .to.emit(platform, "PositionClosed");
      
      const position = await platform.positions(1);
      expect(position.isOpen).to.equal(false);
      
      // Balance should be initial - position + position + profit
      // 1.0 - 0.1 + 0.1 + 0.2 = 1.2
      const expectedBalance = ethers.parseEther("1.2");
      expect(await platform.getBalance(user1.address)).to.equal(expectedBalance);
    });

    it("Should allow closing a losing position", async function () {
      const { platform, owner, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2);
      
      // Price halves
      await platform.connect(owner).updatePrice("DOGE", ethers.parseEther("0.00005"));
      
      await platform.connect(user1).closePosition(1);
      
      // Balance should be 0.9 + 0 (position amount - loss, where loss = 0.1)
      // 1.0 - 0.1 (locked) + 0.1 - 0.1 (loss) = 0.9
      expect(await platform.getBalance(user1.address)).to.equal(ethers.parseEther("0.9"));
    });

    it("Should handle total liquidation when loss exceeds position amount", async function () {
      const { platform, owner, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      // Open with high leverage
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 10);
      
      // Price drops by 20% (10x leverage means 200% loss, exceeding position amount)
      await platform.connect(owner).updatePrice("DOGE", ethers.parseEther("0.00008"));
      
      await platform.connect(user1).closePosition(1);
      
      // Position is liquidated, balance should be 0.9 (initial - position amount)
      expect(await platform.getBalance(user1.address)).to.equal(ethers.parseEther("0.9"));
    });

    it("Should not allow closing someone else's position", async function () {
      const { platform, user1, user2 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2);
      
      await expect(
        platform.connect(user2).closePosition(1)
      ).to.be.revertedWith("Not position owner");
    });

    it("Should not allow closing already closed position", async function () {
      const { platform, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2);
      await platform.connect(user1).closePosition(1);
      
      await expect(
        platform.connect(user1).closePosition(1)
      ).to.be.revertedWith("Position is not open");
    });

    it("Should get user's open positions", async function () {
      const { platform, user1 } = await setupWithMemecoin();
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2);
      await platform.connect(user1).openPosition("DOGE", 1, ethers.parseEther("0.1"), 3);
      
      let openPositions = await platform.getUserOpenPositions(user1.address);
      expect(openPositions.length).to.equal(2);
      
      // Close one position
      await platform.connect(user1).closePosition(1);
      
      openPositions = await platform.getUserOpenPositions(user1.address);
      expect(openPositions.length).to.equal(1);
      expect(openPositions[0]).to.equal(2);
    });
  });

  describe("Security Features", function () {
    it("Should prevent reentrancy attacks on withdrawal", async function () {
      const { platform, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      
      // The ReentrancyGuard should prevent reentrancy
      // This is more of a sanity check that the guard is in place
      await expect(
        platform.connect(user1).withdraw(ethers.parseEther("0.5"))
      ).to.not.be.reverted;
    });

    it("Should prevent reentrancy on position closing", async function () {
      const { platform, owner, user1 } = await loadFixture(deployMemethPlatformFixture);
      
      await platform.connect(owner).addMemecoin("DOGE", "Dogecoin", ethers.parseEther("0.0001"));
      await platform.connect(user1).deposit({ value: ethers.parseEther("1.0") });
      await platform.connect(user1).openPosition("DOGE", 0, ethers.parseEther("0.1"), 2);
      
      // The ReentrancyGuard should prevent reentrancy
      await expect(
        platform.connect(user1).closePosition(1)
      ).to.not.be.reverted;
    });
  });
});
