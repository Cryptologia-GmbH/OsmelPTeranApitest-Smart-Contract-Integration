# Smart Contract API Integration - Test Project

**Created by:** Osmel P. Teran  
**Date:** October 2025  
**Purpose:** Technical test for ETHVault - Backend API integration with Smart Contracts

---

## 📋 Project Overview

This project demonstrates the integration of a backend API with smart contracts deployed on the Ethereum Holesky Testnet. The API fetches real-time blockchain data from the StakingDashboard smart contract and provides RESTful endpoints to access this information.

## ✅ Test Requirements (Completed)

- ✅ Create a new API named `OsmelPTeranApitest`
- ✅ Integrate with smart contracts on Holesky Testnet
- ✅ Fetch information from blockchain through the API
- ✅ Display results in console (no frontend required)
- ✅ Work within the existing shared project structure

---

## 🏗️ Architecture

### Files Created/Modified

```
backend/
├── controllers/
│   └── osmelPTeranApitestController.js    ✨ NEW - Smart contract integration logic
├── routes/
│   └── osmelPTeranApitestRoute.js         ✨ NEW - API route definitions
├── config/
│   ├── env.js                             ✏️ MODIFIED - Added Web3 configuration
│   └── config.env.example                 ✏️ MODIFIED - Added blockchain variables
├── app.js                                 ✏️ MODIFIED - Registered new routes
├── test-smart-contract-api.js             ✨ NEW - Standalone test script
├── API_DOCUMENTATION.md                   ✨ NEW - API documentation
└── README files                           ✨ NEW - Project documentation
```

### Technology Stack

- **Backend:** Node.js + Express.js
- **Blockchain Library:** ethers.js v6
- **Network:** Ethereum Holesky Testnet (Chain ID: 17000)
- **Smart Contract:** StakingDashboard
- **Contract Address:** `0xd33e9676463597AfFF5bB829796836631F4e2f1f`
- **RPC URL:** `https://ethereum-holesky-rpc.publicnode.com`

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Standalone Test (Recommended)

This test demonstrates the smart contract integration without requiring database setup:

```bash
node backend/test-smart-contract-api.js
```

**Expected Output:**
```
═══════════════════════════════════════════════════════════════
  OSMEL P. TERAN - SMART CONTRACT API TEST
═══════════════════════════════════════════════════════════════

🔌 Connecting to Holesky Testnet...
✅ Successfully connected to blockchain!
📍 Contract Address: 0xd33e9676463597AfFF5bB829796836631F4e2f1f
🌐 Network: Holesky Testnet (Chain ID: 17000)
📦 Current Block: 4718791

TEST 1: FETCHING STAKING OVERVIEW
═══════════════════════════════════════════════════════════════
📊 Calling contract.getStakingOverview()...
✅ Successfully fetched staking overview!

┌────────────────────────────────────────────────┐
│  STAKING OVERVIEW RESULTS                      │
├────────────────────────────────────────────────┤
│ 💰 Total ETH Deposited:    18.616175       ETH │
│ 🔒 Total ETH Staked:       1.6511          ETH │
│ 👥 Total Stakers:          5                   │
│ 📈 Average Stake Amount:   0.33022         ETH │
└────────────────────────────────────────────────┘

TEST 2: FETCHING TOP 10 STAKERS LEADERBOARD
═══════════════════════════════════════════════════════════════
🏆 Calling contract.getLeaderboard(10)...
✅ Successfully fetched leaderboard!

┌───┬──────────────────────────────────────────────┬──────────────┬──────────┐
│ # │ Staker Address                               │ Staked (ETH) │ Share %  │
├───┼──────────────────────────────────────────────┼──────────────┼──────────┤
│  1 │ 0xC24e...8e8B                                │ 1.5          │   90.84% │
│  2 │ 0x9920...3673                                │ 0.1          │    6.05% │
│  3 │ 0x0D0B...617a                                │ 0.05         │    3.02% │
│  4 │ 0x62f3...D50D                                │ 0.001        │    0.06% │
│  5 │ 0x2462...5eCA                                │ 0.0001       │    0.00% │
└───┴──────────────────────────────────────────────┴──────────────┴──────────┘

✅ ALL TESTS COMPLETED SUCCESSFULLY!
⏱️  Total execution time: 0.39 seconds
```

### 3. Run the Full Server (Optional)

If you want to test the actual API endpoints:

```bash
# Configure MongoDB connection in .env first
npm run backend

# Then test endpoints with curl or Postman
curl http://localhost:4000/api/v1/osmelpteran/staking-overview
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:4000/api/v1/osmelpteran
```

### Available Endpoints

#### 1. Get Staking Overview
```
GET /staking-overview
```

Returns comprehensive staking statistics from the smart contract.

**Response Example:**
```json
{
  "success": true,
  "message": "Staking overview fetched successfully",
  "data": {
    "totalETHDeposited": "18.616175",
    "totalETHStaked": "1.6511",
    "totalStakers": "5",
    "averageStakeAmount": "0.33022"
  },
  "contractAddress": "0xd33e9676463597AfFF5bB829796836631F4e2f1f",
  "network": "Holesky Testnet"
}
```

#### 2. Get Leaderboard
```
GET /leaderboard?count=10
```

Returns top stakers from the smart contract.

**Query Parameters:**
- `count` (optional, default: 10) - Number of top stakers to retrieve

**Response Example:**
```json
{
  "success": true,
  "message": "Top 10 stakers fetched successfully",
  "data": {
    "count": 5,
    "leaderboard": [
      {
        "rank": 1,
        "address": "0xC24e1eD07D5B7fa4Ba665e7ef2c76cA3Cf618e8B",
        "stakedAmount": "1.5",
        "percentageOfTotal": "90.84"
      }
    ]
  },
  "contractAddress": "0xd33e9676463597AfFF5bB829796836631F4e2f1f",
  "network": "Holesky Testnet"
}
```

#### 3. Get Contract Information
```
GET /contract-info
```

Returns basic information about the smart contract and network.

**Response Example:**
```json
{
  "success": true,
  "message": "Contract information fetched successfully",
  "data": {
    "contractAddress": "0xd33e9676463597AfFF5bB829796836631F4e2f1f",
    "network": {
      "name": "Holesky Testnet",
      "chainId": 17000,
      "currentBlockNumber": 4718791
    },
    "rpcUrl": "https://ethereum-holesky-rpc.publicnode.com",
    "contractType": "StakingDashboard"
  }
}
```

---

## 🔧 Implementation Details

### Smart Contract Functions Used

The API interacts with the following smart contract functions:

1. **`getStakingOverview()`**
   - Returns: `totalETHDeposited`, `totalETHStaked`, `totalStakers`, `averageStakeAmount`
   - Purpose: Provides comprehensive staking statistics

2. **`getLeaderboard(uint256 count)`**
   - Parameters: Number of top stakers to retrieve
   - Returns: Arrays of addresses, amounts, and percentage shares
   - Purpose: Shows top stakers ranking

### Key Features

- ✅ Real-time blockchain data fetching
- ✅ Proper error handling with middleware
- ✅ Clean code with English comments
- ✅ Detailed console logging for demonstration
- ✅ RESTful API design
- ✅ Environment variable configuration
- ✅ Read-only operations (no state changes)
- ✅ Production-ready code structure

### Error Handling

All endpoints use the `asyncErrorHandler` middleware to catch and handle errors gracefully:

```javascript
exports.getStakingOverview = asyncErrorHandler(async (req, res, next) => {
  try {
    // Logic here
  } catch (error) {
    console.error("Error:", error.message);
    return next(new ErrorHandler("Error message", 500));
  }
});
```

---

## 📊 Test Results

### Successful Integration ✅

The test script successfully demonstrates:

1. **Connection to Holesky Testnet** ✅
   - Connected to RPC endpoint
   - Verified chain ID (17000)
   - Retrieved current block number

2. **Smart Contract Data Retrieval** ✅
   - Fetched staking overview with real data
   - Retrieved leaderboard with 5 active stakers
   - Obtained contract and network information

3. **Data Processing** ✅
   - Converted Wei to ETH properly
   - Calculated percentage shares accurately
   - Formatted data for API responses

4. **Console Output** ✅
   - Detailed logging with emojis
   - Formatted tables for readability
   - Clear success/error messages

### Live Data Retrieved

From the Holesky Testnet at block 4718791:

- **Total ETH Deposited:** 18.616175 ETH
- **Total ETH Staked:** 1.6511 ETH
- **Number of Stakers:** 5
- **Average Stake:** 0.33022 ETH per staker
- **Top Staker:** 0xC24e...8e8B with 1.5 ETH (90.84% share)

---

## 📁 Additional Documentation

For more detailed information, see:

- **[API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)** - Complete API reference
- **[config.env.example](backend/config/config.env.example)** - Environment variable examples
- **[Smart Contracts](contracts/)** - Solidity source code

---

## 🛠️ Environment Variables

The following environment variables can be configured (optional, defaults provided):

```env
# Web3 / Blockchain Configuration
HOLESKY_RPC_URL=https://ethereum-holesky-rpc.publicnode.com
STAKING_DASHBOARD_ADDRESS=0xd33e9676463597AfFF5bB829796836631F4e2f1f
DETH_ADDRESS=0x520d7dAB4A5bCE6ceA323470dbffCea14b78253a
SETH_ADDRESS=0x16b0cD88e546a90DbE380A63EbfcB487A9A05D8e
GOVERNANCE_ADDRESS=0xD396FE92075716598FAC875D12E708622339FA3e
```

---

## 🎯 Testing the API

### Option 1: Standalone Test Script (Recommended)

```bash
node backend/test-smart-contract-api.js
```

This script:
- ✅ Doesn't require database connection
- ✅ Doesn't require the full server
- ✅ Shows detailed console output
- ✅ Tests all smart contract functions
- ✅ Completes in under 1 second

### Option 2: cURL Commands

If running the full server:

```bash
# Test staking overview
curl http://localhost:4000/api/v1/osmelpteran/staking-overview

# Test leaderboard (top 5)
curl http://localhost:4000/api/v1/osmelpteran/leaderboard?count=5

# Test contract info
curl http://localhost:4000/api/v1/osmelpteran/contract-info
```

### Option 3: Postman/Thunder Client

Import the following:
- Base URL: `http://localhost:4000`
- Add the three GET endpoints listed above

---

## 📝 Code Quality

- ✅ All code commented in English
- ✅ Clean and organized file structure
- ✅ Follows existing project conventions
- ✅ Proper error handling
- ✅ No hardcoded secrets
- ✅ Environment variable configuration
- ✅ Modular and maintainable code
- ✅ Production-ready implementation

---

## 🎥 Video Demonstration

The test script provides a complete demonstration of the functionality with:
- Real-time blockchain connection
- Live data fetching from smart contracts
- Formatted console output
- Success confirmations
- Execution time tracking

Simply run: `node backend/test-smart-contract-api.js`

---

## 📧 Contact

**Osmel P. Teran**

For questions or further information about this implementation, please contact me.

---

## 📄 License

This is a test project created as part of a technical assessment for ETHVault.

---

## 🙏 Acknowledgments

- ETHVault team for the test project opportunity
- Ethereum Holesky Testnet for providing a reliable testing environment
- ethers.js team for the excellent blockchain library

---

**Project Status:** ✅ Completed  
**All Requirements:** ✅ Met  
**Test Results:** ✅ Successful

