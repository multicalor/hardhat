
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const [signer, acc1] = await ethers.getSigners();

    const Greeter = await ethers.getContractFactory("Greeter", signer);
    const greeter = await Greeter.deploy();
    await greeter.deployed();
    console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
