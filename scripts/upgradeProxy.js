const { ethers } = require("hardhat");

async function main() {
  const proxyAdmin = await ethers.getContract("BoxProxyAdmin");
  const transparentProxy = await ethers.getContract("Box_Proxy");
  const boxProxy = await ethers.getContractAt(
    "BoxV2",
    transparentProxy.address
  );

  const upgradeTx = await proxyAdmin.upgrade(
    transparentProxy.address,
    boxV2.address
  );
  await upgradeTx.wait(1);

  const getVersion = await boxProxy.version();
  console.log(getVersion.toString());
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
