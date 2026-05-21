const { expect } = require("chai");

describe("Basic Tests", function () {
  it("Should pass basic sanity check", async function () {
    expect(true).to.equal(true);
  });

  it("Should have access to ethers", async function () {
    const { ethers } = require("hardhat");
    expect(ethers).to.not.be.undefined;
  });
});
