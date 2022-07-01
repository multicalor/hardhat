// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const GreeterArtifact = require("../artifacts/contracts/Greeter.sol/Greeter.json");
const ethers = hre.ethers;

async function main() {
    const [acc1, acc2] = await ethers.getSigners();
    const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
    const transfersContract = new ethers.Contract(contractAddress, GreeterArtifact.abi, acc1);

    const setGreetResult = await transfersContract.setGreet("Hello from prg");
    console.log(setGreetResult)
    setGreetResult.wait()
    const greet = await transfersContract.getGreet();
    console.log(greet)
    console.log("Greeter deployed to:", transfersContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
