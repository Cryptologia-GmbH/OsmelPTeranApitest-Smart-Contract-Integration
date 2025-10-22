const { ethers } = require("ethers");
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");

// Load StakingDashboard ABI
const stakingDashboardAbiPath = path.join(__dirname, "../../lib/abis/stakingDashboard.json");
const stakingDashboardAbi = JSON.parse(fs.readFileSync(stakingDashboardAbiPath, "utf8"));

// Holesky Testnet Configuration
const HOLESKY_RPC_URL = "https://ethereum-holesky-rpc.publicnode.com";
const STAKING_DASHBOARD_ADDRESS = "0xd33e9676463597AfFF5bB829796836631F4e2f1f";

/**
 * Initialize Web3 provider and contract instance
 * @returns {Object} Contract instance connected to Holesky Testnet
 */
const initializeContract = () => {
  try {
    // Create provider connected to Holesky Testnet
    const provider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
    
    // Initialize contract instance with ABI and address
    const contract = new ethers.Contract(
      STAKING_DASHBOARD_ADDRESS,
      stakingDashboardAbi,
      provider
    );
    
    console.log("✅ Smart Contract initialized successfully");
    console.log(`📍 Contract Address: ${STAKING_DASHBOARD_ADDRESS}`);
    console.log(`🌐 Network: Holesky Testnet`);
    
    return contract;
  } catch (error) {
    console.error("❌ Error initializing contract:", error.message);
    throw new Error("Failed to initialize smart contract connection");
  }
};

/**
 * Get Staking Overview
 * Fetches comprehensive staking statistics from the StakingDashboard contract
 * @route GET /api/v1/osmelpteran/staking-overview
 */
exports.getStakingOverview = asyncErrorHandler(async (req, res, next) => {
  console.log("\n🔍 Fetching Staking Overview from Smart Contract...");
  
  try {
    // Initialize contract
    const contract = initializeContract();
    
    // Call getStakingOverview() function from smart contract
    const overview = await contract.getStakingOverview();
    
    // Parse and format the data
    const stakingData = {
      totalETHDeposited: ethers.formatEther(overview[0]),
      totalETHStaked: ethers.formatEther(overview[1]),
      totalStakers: overview[2].toString(),
      averageStakeAmount: ethers.formatEther(overview[3])
    };
    
    // Log results to console
    console.log("\n📊 STAKING OVERVIEW RESULTS:");
    console.log("════════════════════════════════════════");
    console.log(`💰 Total ETH Deposited: ${stakingData.totalETHDeposited} ETH`);
    console.log(`🔒 Total ETH Staked: ${stakingData.totalETHStaked} ETH`);
    console.log(`👥 Total Stakers: ${stakingData.totalStakers}`);
    console.log(`📈 Average Stake Amount: ${stakingData.averageStakeAmount} ETH`);
    console.log("════════════════════════════════════════\n");
    
    // Send response
    res.status(200).json({
      success: true,
      message: "Staking overview fetched successfully",
      data: stakingData,
      contractAddress: STAKING_DASHBOARD_ADDRESS,
      network: "Holesky Testnet"
    });
  } catch (error) {
    console.error("❌ Error fetching staking overview:", error.message);
    return next(new ErrorHandler("Failed to fetch staking overview from smart contract", 500));
  }
});

/**
 * Get Leaderboard
 * Fetches top stakers from the StakingDashboard contract
 * @route GET /api/v1/osmelpteran/leaderboard
 */
exports.getLeaderboard = asyncErrorHandler(async (req, res, next) => {
  console.log("\n🏆 Fetching Leaderboard from Smart Contract...");
  
  try {
    // Get count from query params (default: 10)
    const count = parseInt(req.query.count) || 10;
    
    // Initialize contract
    const contract = initializeContract();
    
    // Call getLeaderboard() function from smart contract
    const leaderboard = await contract.getLeaderboard(count);
    
    // Parse and format the data
    const leaderboardData = {
      stakerAddresses: leaderboard[0],
      stakedAmounts: leaderboard[1].map(amount => ethers.formatEther(amount)),
      percentageOfTotal: leaderboard[2].map(percentage => {
        // Convert from basis points (10000 = 100%)
        return (Number(percentage) / 100).toFixed(2);
      })
    };
    
    // Create formatted leaderboard array
    const formattedLeaderboard = leaderboardData.stakerAddresses.map((address, index) => ({
      rank: index + 1,
      address: address,
      stakedAmount: leaderboardData.stakedAmounts[index],
      percentageOfTotal: leaderboardData.percentageOfTotal[index]
    }));
    
    // Log results to console
    console.log("\n🏆 LEADERBOARD RESULTS:");
    console.log("════════════════════════════════════════════════════════════════");
    formattedLeaderboard.forEach((staker) => {
      console.log(`#${staker.rank} | Address: ${staker.address}`);
      console.log(`    💎 Staked: ${staker.stakedAmount} ETH | Share: ${staker.percentageOfTotal}%`);
      console.log("────────────────────────────────────────────────────────────────");
    });
    console.log("════════════════════════════════════════════════════════════════\n");
    
    // Send response
    res.status(200).json({
      success: true,
      message: `Top ${count} stakers fetched successfully`,
      data: {
        count: formattedLeaderboard.length,
        leaderboard: formattedLeaderboard
      },
      contractAddress: STAKING_DASHBOARD_ADDRESS,
      network: "Holesky Testnet"
    });
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error.message);
    return next(new ErrorHandler("Failed to fetch leaderboard from smart contract", 500));
  }
});

/**
 * Get Contract Information
 * Returns basic information about the smart contract and network
 * @route GET /api/v1/osmelpteran/contract-info
 */
exports.getContractInfo = asyncErrorHandler(async (req, res, next) => {
  console.log("\n📋 Fetching Contract Information...");
  
  try {
    // Initialize provider
    const provider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
    
    // Get network information
    const network = await provider.getNetwork();
    
    // Get current block number
    const blockNumber = await provider.getBlockNumber();
    
    // Contract information
    const contractInfo = {
      contractAddress: STAKING_DASHBOARD_ADDRESS,
      network: {
        name: "Holesky Testnet",
        chainId: Number(network.chainId),
        currentBlockNumber: blockNumber
      },
      rpcUrl: HOLESKY_RPC_URL,
      contractType: "StakingDashboard",
      description: "Smart contract for viewing staking statistics and leaderboard"
    };
    
    // Log results to console
    console.log("\n📋 CONTRACT INFORMATION:");
    console.log("════════════════════════════════════════");
    console.log(`📍 Contract Address: ${contractInfo.contractAddress}`);
    console.log(`🌐 Network: ${contractInfo.network.name}`);
    console.log(`🔗 Chain ID: ${contractInfo.network.chainId}`);
    console.log(`📦 Current Block: ${contractInfo.network.currentBlockNumber}`);
    console.log(`🔌 RPC URL: ${contractInfo.rpcUrl}`);
    console.log(`📝 Contract Type: ${contractInfo.contractType}`);
    console.log("════════════════════════════════════════\n");
    
    // Send response
    res.status(200).json({
      success: true,
      message: "Contract information fetched successfully",
      data: contractInfo
    });
  } catch (error) {
    console.error("❌ Error fetching contract info:", error.message);
    return next(new ErrorHandler("Failed to fetch contract information", 500));
  }
});

