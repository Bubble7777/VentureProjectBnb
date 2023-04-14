const hre = require("hardhat");

async function main() {
  const VentureVerse = await hre.ethers.getContractFactory("VentureVerse");
  const ventureVerse = await VentureVerse.deploy();

  await ventureVerse.deployed();

  console.log(`VentureVerse deployed to ${ventureVerse.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
