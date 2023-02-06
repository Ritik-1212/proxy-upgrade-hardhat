const { developmentChains } = require("../helper-hardhat-config");
const { network, deployments, ethers } = require("hardhat");
const { assert } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("upgradeProxy", function () {
      let transparentProxy, boxV1, boxV2, adminProxy, proxyBox;

      beforeEach(async function () {
        await deployments.fixture(["Box"]);

        transparentProxy = await ethers.getContract("Box_Proxy");
        boxV1 = await ethers.getContract("Box");
        boxV2 = await ethers.getContract("BoxV2");
        adminProxy = await ethers.getContract("BoxProxyAdmin");
        proxyBox = await ethers.getContractAt("Box", transparentProxy.address);
      });

      it("should update the contract and deploy", async function () {
        const version = await boxV1.version();
        assert(version.toString() == "1");
        await deployments.fixture(["BoxV2"]);
        const upgradeTx = await adminProxy.upgrade(
          transparentProxy.address,
          boxV2.address
        );
        await upgradeTx.wait(1);
        const versionTwo = await boxV2.version();
        assert.equal(versionTwo.toString(), "2");
      });
    });
