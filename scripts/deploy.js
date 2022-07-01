// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const [signer] = await ethers.getSigners();
    const Transfers = await ethers.getContractFactory("Transfers", signer);
    const transfers = await Transfers.deploy(3);

    await transfers.deployed();

    console.log("Transfers deployed to:", transfers.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
