const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account: " + deployer.address);

    const DAI = "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C";
    const oldOHM = "0xC0b491daBf3709Ee5Eb79E603D73289Ca6060932";
    const oldsOHM = "0x1Fecda1dE7b6951B248C0B62CaeBD5BAbedc2084";
    const oldStaking = "0xC5d3318C0d74a72cD7C55bdf844e24516796BaB2";
    const oldwsOHM = "0xe73384f11Bb748Aa0Bc20f7b02958DF573e6E2ad";
    const sushiRouter = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
    const uniRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const oldTreasury = "0x0d722D813601E48b7DAcb2DF9bae282cFd98c6E7";

    const FRAX = "0x2f7249cb599139e560f0c81c269ab9b04799e453";
    const LUSD = "0x45754df05aa6305114004358ecf8d04ff3b84e26";

    const wETH = "0x2f7249cb599139e560f0c81c269ab9b04799e453";

    // const Authority = await ethers.getContractFactory("OlympusAuthority");
    // const authority = await Authority.deploy(
    //     deployer.address,
    //     deployer.address,
    //     deployer.address,
    //     deployer.address
    // );

    // const Migrator = await ethers.getContractFactory("OlympusTokenMigrator");
    // const migrator = await Migrator.deploy(
    //     oldOHM,
    //     oldsOHM,
    //     oldTreasury,
    //     oldStaking,
    //     oldwsOHM,
    //     sushiRouter,
    //     uniRouter,
    //     "0",
    //     authority.address
    // );

    const firstEpochNumber = "550";
    const firstBlockNumber = "9505000";

    const OHM = await ethers.getContractFactory("OlympusERC20Token");
    const ohm = await OHM.deploy();
    console.log("OlympusERC20Token deployed to:", ohm.address);

    const SOHM = await ethers.getContractFactory("sOlympus");
    const sOHM = await SOHM.deploy();
    console.log("sOlympus deployed to:", sOHM.address);

    const WSSQUID = await ethers.getContractFactory("wsSQUID");
    const wsSQUID = await WSSQUID.deploy(sOHM.address);
    console.log("WSSQUID deployed to:", wsSQUID.address);

    // await migrator.setgOHM(WSSQUID.address);
    const WETHBondingCalculator = await ethers.getContractFactory("WETHBondingCalculator");
    const wethBondingCalculator = await WETHBondingCalculator.deploy(ohm.address);
    console.log("WETHBondingCalculator deployed to:", wethBondingCalculator.address);

    const OlympusTreasury = await ethers.getContractFactory("OlympusTreasury");
    const olympusTreasury = await OlympusTreasury.deploy(ohm.address, wETH, wethBondingCalculator.address, "2200");
    console.log("OlympusTreasury deployed to:", olympusTreasury.address);

    // await olympusTreasury.queueTimelock("0", migrator.address, migrator.address);
    // await olympusTreasury.queueTimelock("8", migrator.address, migrator.address);
    // await olympusTreasury.queueTimelock("2", DAI, DAI);
    // await olympusTreasury.queueTimelock("2", FRAX, FRAX);
    // await olympusTreasury.queueTimelock("2", LUSD, LUSD);

    // await authority.pushVault(olympusTreasury.address, true); // replaces ohm.setVault(treasury.address)

    const OlympusStaking = await ethers.getContractFactory("OlympusStaking");
    const staking = await OlympusStaking.deploy(
        ohm.address,
        sOHM.address,
        "2200",
        firstEpochNumber,
        firstBlockNumber
    );
    console.log("OlympusStaking deployed to:", staking.address);

    const Distributor = await ethers.getContractFactory("contracts/StakingDistributor.sol:Distributor");
    const distributor = await Distributor.deploy(
        olympusTreasury.address,
        ohm.address,
        "2200", // epoch length4
        firstEpochNumber //next epoch block
    );
    console.log("Distributor deployed to:", distributor.address);

    // Initialize sohm
    // await sOHM.setIndex("7675210820");
    // await sOHM.setgOHM(gOHM.address);
    // await sOHM.initialize(staking.address, olympusTreasury.address);

    // await staking.setDistributor(distributor.address);

    // await olympusTreasury.execute("0");
    // await olympusTreasury.execute("1");
    // await olympusTreasury.execute("2");
    // await olympusTreasury.execute("3");
    // await olympusTreasury.execute("4");

    // console.log("Olympus Authority: ", authority.address);
    // console.log("OHM: " + ohm.address);
    // console.log("sOhm: " + sOHM.address);
    // console.log("gOHM: " + gOHM.address);
    // console.log("Olympus Treasury: " + olympusTreasury.address);
    // console.log("Staking Contract: " + staking.address);
    // console.log("Distributor: " + distributor.address);
    // console.log("Migrator: " + migrator.address);
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
