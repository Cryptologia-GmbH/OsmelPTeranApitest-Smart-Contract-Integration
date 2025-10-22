/**
 * Smart Contract API Test Script
 * Created by: Osmel P. Teran
 * 
 * This standalone script tests the smart contract integration
 * without requiring the full Express server or database connection.
 * 
 * Run with: node backend/test-smart-contract-api.js
 */

const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");

// Console colors for better visibility
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m"
};

console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}  OSMEL P. TERAN - SMART CONTRACT API TEST${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

// Load StakingDashboard ABI
const stakingDashboardAbiPath = path.join(__dirname, "../lib/abis/stakingDashboard.json");
const stakingDashboardAbi = JSON.parse(fs.readFileSync(stakingDashboardAbiPath, "utf8"));

// Holesky Testnet Configuration
const HOLESKY_RPC_URL = "https://ethereum-holesky-rpc.publicnode.com";
const STAKING_DASHBOARD_ADDRESS = "0xd33e9676463597AfFF5bB829796836631F4e2f1f";

/**
 * Initialize connection to smart contract
 */
async function initializeContract() {
  try {
    console.log(`${colors.blue}🔌 Connecting to Holesky Testnet...${colors.reset}`);
    
    // Create provider connected to Holesky Testnet
    const provider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
    
    // Initialize contract instance
    const contract = new ethers.Contract(
      STAKING_DASHBOARD_ADDRESS,
      stakingDashboardAbi,
      provider
    );
    
    // Get network info to verify connection
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    
    console.log(`${colors.green}✅ Successfully connected to blockchain!${colors.reset}`);
    console.log(`${colors.yellow}📍 Contract Address: ${STAKING_DASHBOARD_ADDRESS}${colors.reset}`);
    console.log(`${colors.yellow}🌐 Network: Holesky Testnet (Chain ID: ${network.chainId})${colors.reset}`);
    console.log(`${colors.yellow}📦 Current Block: ${blockNumber}${colors.reset}\n`);
    
    return { contract, provider };
  } catch (error) {
    console.error(`${colors.red}❌ Error initializing contract: ${error.message}${colors.reset}`);
    throw error;
  }
}

/**
 * Test 1: Get Staking Overview
 */
async function testStakingOverview(contract) {
  console.log(`${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}  TEST 1: FETCHING STAKING OVERVIEW${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
  
  try {
    console.log(`${colors.blue}📊 Calling contract.getStakingOverview()...${colors.reset}\n`);
    
    // Call smart contract function
    const overview = await contract.getStakingOverview();
    
    // Parse and format data
    const stakingData = {
      totalETHDeposited: ethers.formatEther(overview[0]),
      totalETHStaked: ethers.formatEther(overview[1]),
      totalStakers: overview[2].toString(),
      averageStakeAmount: ethers.formatEther(overview[3])
    };
    
    // Display results
    console.log(`${colors.green}✅ Successfully fetched staking overview!${colors.reset}\n`);
    console.log(`${colors.cyan}┌────────────────────────────────────────────────┐${colors.reset}`);
    console.log(`${colors.cyan}│  STAKING OVERVIEW RESULTS                      │${colors.reset}`);
    console.log(`${colors.cyan}├────────────────────────────────────────────────┤${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 💰 Total ETH Deposited:    ${stakingData.totalETHDeposited.padEnd(15)} ETH ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 🔒 Total ETH Staked:       ${stakingData.totalETHStaked.padEnd(15)} ETH ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 👥 Total Stakers:          ${stakingData.totalStakers.padEnd(19)} ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 📈 Average Stake Amount:   ${stakingData.averageStakeAmount.padEnd(15)} ETH ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}└────────────────────────────────────────────────┘${colors.reset}\n`);
    
    return stakingData;
  } catch (error) {
    console.error(`${colors.red}❌ Error fetching staking overview: ${error.message}${colors.reset}\n`);
    throw error;
  }
}

/**
 * Test 2: Get Leaderboard
 */
async function testLeaderboard(contract, count = 10) {
  console.log(`${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}  TEST 2: FETCHING TOP ${count} STAKERS LEADERBOARD${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
  
  try {
    console.log(`${colors.blue}🏆 Calling contract.getLeaderboard(${count})...${colors.reset}\n`);
    
    // Call smart contract function
    const leaderboard = await contract.getLeaderboard(count);
    
    // Parse and format data
    const formattedLeaderboard = leaderboard[0].map((address, index) => ({
      rank: index + 1,
      address: address,
      stakedAmount: ethers.formatEther(leaderboard[1][index]),
      percentageOfTotal: (Number(leaderboard[2][index]) / 100).toFixed(2)
    }));
    
    // Display results
    console.log(`${colors.green}✅ Successfully fetched leaderboard!${colors.reset}\n`);
    
    if (formattedLeaderboard.length === 0) {
      console.log(`${colors.yellow}⚠️  No stakers found in the contract${colors.reset}\n`);
    } else {
      console.log(`${colors.cyan}┌───┬──────────────────────────────────────────────┬──────────────┬──────────┐${colors.reset}`);
      console.log(`${colors.cyan}│ # │ Staker Address                               │ Staked (ETH) │ Share %  │${colors.reset}`);
      console.log(`${colors.cyan}├───┼──────────────────────────────────────────────┼──────────────┼──────────┤${colors.reset}`);
      
      formattedLeaderboard.forEach((staker) => {
        const rank = staker.rank.toString().padStart(2);
        const address = staker.address.substring(0, 6) + "..." + staker.address.substring(38);
        const amount = staker.stakedAmount.padEnd(12);
        const percentage = staker.percentageOfTotal.padStart(7);
        
        console.log(`${colors.cyan}│${colors.reset} ${rank} ${colors.cyan}│${colors.reset} ${address.padEnd(48)} ${colors.cyan}│${colors.reset} ${amount} ${colors.cyan}│${colors.reset} ${percentage}% ${colors.cyan}│${colors.reset}`);
      });
      
      console.log(`${colors.cyan}└───┴──────────────────────────────────────────────┴──────────────┴──────────┘${colors.reset}\n`);
    }
    
    return formattedLeaderboard;
  } catch (error) {
    console.error(`${colors.red}❌ Error fetching leaderboard: ${error.message}${colors.reset}\n`);
    throw error;
  }
}

/**
 * Test 3: Get Contract Info
 */
async function testContractInfo(provider) {
  console.log(`${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}  TEST 3: FETCHING CONTRACT INFORMATION${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
  
  try {
    console.log(`${colors.blue}📋 Gathering contract and network information...${colors.reset}\n`);
    
    // Get network information
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    
    const contractInfo = {
      contractAddress: STAKING_DASHBOARD_ADDRESS,
      network: {
        name: "Holesky Testnet",
        chainId: Number(network.chainId),
        currentBlockNumber: blockNumber
      },
      rpcUrl: HOLESKY_RPC_URL,
      contractType: "StakingDashboard"
    };
    
    // Display results
    console.log(`${colors.green}✅ Successfully fetched contract information!${colors.reset}\n`);
    console.log(`${colors.cyan}┌────────────────────────────────────────────────────────────────┐${colors.reset}`);
    console.log(`${colors.cyan}│  CONTRACT INFORMATION                                          │${colors.reset}`);
    console.log(`${colors.cyan}├────────────────────────────────────────────────────────────────┤${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 📍 Address:       ${contractInfo.contractAddress.padEnd(42)} ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 🌐 Network:       ${contractInfo.network.name.padEnd(42)} ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 🔗 Chain ID:      ${contractInfo.network.chainId.toString().padEnd(42)} ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 📦 Block Number:  ${contractInfo.network.currentBlockNumber.toString().padEnd(42)} ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}│${colors.reset} 📝 Type:          ${contractInfo.contractType.padEnd(42)} ${colors.cyan}│${colors.reset}`);
    console.log(`${colors.cyan}└────────────────────────────────────────────────────────────────┘${colors.reset}\n`);
    
    return contractInfo;
  } catch (error) {
    console.error(`${colors.red}❌ Error fetching contract info: ${error.message}${colors.reset}\n`);
    throw error;
  }
}

/**
 * Main test runner
 */
async function runAllTests() {
  const startTime = Date.now();
  
  try {
    // Initialize contract
    const { contract, provider } = await initializeContract();
    
    // Run all tests
    await testStakingOverview(contract);
    await testLeaderboard(contract, 10);
    await testContractInfo(provider);
    
    // Summary
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.green}  ✅ ALL TESTS COMPLETED SUCCESSFULLY!${colors.reset}`);
    console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.yellow}⏱️  Total execution time: ${duration} seconds${colors.reset}\n`);
    
    console.log(`${colors.bright}${colors.cyan}API Endpoints Ready:${colors.reset}`);
    console.log(`${colors.cyan}  • GET /api/v1/osmelpteran/staking-overview${colors.reset}`);
    console.log(`${colors.cyan}  • GET /api/v1/osmelpteran/leaderboard?count=10${colors.reset}`);
    console.log(`${colors.cyan}  • GET /api/v1/osmelpteran/contract-info${colors.reset}\n`);
    
    console.log(`${colors.bright}Created by: Osmel P. Teran${colors.reset}\n`);
    
  } catch (error) {
    console.error(`\n${colors.red}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.error(`${colors.red}  ❌ TEST FAILED${colors.reset}`);
    console.error(`${colors.red}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.error(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }
}

// Run tests
runAllTests();

