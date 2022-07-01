// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;
const TransfersArtifact = require("../artifacts/contracts/Transfers.sol/Transfers.json")

const currentBalance = async (address, msg='') => {
    const rawBalance = await ethers.provider.getBalance(address);
    const balance = ethers.utils.formatEther(rawBalance);
    console.log(msg, balance);
    return balance;
}

async function main() {
    const [acc1, acc2] = await ethers.getSigners();
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const transfersContract = new ethers.Contract(contractAddress, TransfersArtifact.abi, acc1);

    const tx = {
        to:contractAddress,
        value: ethers.utils.parseEther('1'),
    }

    const txSend = await acc2.sendTransaction(tx);
    await txSend.wait();
    //
    await currentBalance(acc2.address, 'account 2 balance: ')
    await currentBalance(contractAddress, 'contract balance: ')
    try {
        const result1 = await transfersContract.getTransfer('0');
    } catch (e) {
        
    }
    
    try {
        const result = await transfersContract.connect(acc2).withdrawTo(acc2.address);
    } catch (e) {
        console.log(e)

    }


    console.log( result1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
