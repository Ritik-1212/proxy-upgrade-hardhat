const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const BoxV1 = await deploy("BoxV2", {
    from: deployer,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
    log: true,
    Proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "BoxProxyAdmin",
        artifacts: "BoxProxyAdmin",
      },
    },
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(BoxV1.address, []);
  }
};

module.exports.tags = ["all", "Box"];
