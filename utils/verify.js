const { run } = require("hardhat");

async function verify(contractAddress, arguments) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: arguments,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    }
  }
}

module.exports = {
  verify,
};
