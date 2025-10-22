# Osmel P. Teran API Test - Smart Contract Integration

## Overview

This API provides endpoints to fetch real-time blockchain data from the StakingDashboard smart contract deployed on the Holesky Testnet (Ethereum).

**Created by:** Osmel P. Teran  
**Network:** Holesky Testnet (Chain ID: 17000)  
**Contract Address:** `0xd33e9676463597AfFF5bB829796836631F4e2f1f`  
**RPC URL:** `https://ethereum-holesky-rpc.publicnode.com`

---

## API Endpoints

### Base URL
```
http://localhost:4000/api/v1/osmelpteran
```

---

### 1. Get Staking Overview

Fetches comprehensive staking statistics from the smart contract.

**Endpoint:** `GET /staking-overview`

**Response:**
```json
{
  "success": true,
  "message": "Staking overview fetched successfully",
  "data": {
    "totalETHDeposited": "100.5",
    "totalETHStaked": "85.3",
    "totalStakers": "42",
    "averageStakeAmount": "2.03"
  },
  "contractAddress": "0xd33e9676463597AfFF5bB829796836631F4e2f1f",
  "network": "Holesky Testnet"
}
```

**Example Request:**
```bash
curl http://localhost:4000/api/v1/osmelpteran/staking-overview
```

---

### 2. Get Leaderboard

Fetches the top stakers from the smart contract.

**Endpoint:** `GET /leaderboard`

**Query Parameters:**
- `count` (optional, default: 10) - Number of top stakers to retrieve

**Response:**
```json
{
  "success": true,
  "message": "Top 10 stakers fetched successfully",
  "data": {
    "count": 10,
    "leaderboard": [
      {
        "rank": 1,
        "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        "stakedAmount": "25.5",
        "percentageOfTotal": "29.89"
      },
      // ... more stakers
    ]
  },
  "contractAddress": "0xd33e9676463597AfFF5bB829796836631F4e2f1f",
  "network": "Holesky Testnet"
}
```

**Example Requests:**
```bash
# Get top 10 stakers (default)
curl http://localhost:4000/api/v1/osmelpteran/leaderboard

# Get top 5 stakers
curl http://localhost:4000/api/v1/osmelpteran/leaderboard?count=5
```

---

### 3. Get Contract Information

Returns basic information about the smart contract and network.

**Endpoint:** `GET /contract-info`

**Response:**
```json
{
  "success": true,
  "message": "Contract information fetched successfully",
  "data": {
    "contractAddress": "0xd33e9676463597AfFF5bB829796836631F4e2f1f",
    "network": {
      "name": "Holesky Testnet",
      "chainId": 17000,
      "currentBlockNumber": 1234567
    },
    "rpcUrl": "https://ethereum-holesky-rpc.publicnode.com",
    "contractType": "StakingDashboard",
    "description": "Smart contract for viewing staking statistics and leaderboard"
  }
}
```

**Example Request:**
```bash
curl http://localhost:4000/api/v1/osmelpteran/contract-info
```

---

## Console Output

All API calls log detailed information to the console for demonstration purposes:

### Staking Overview Console Output:
```
🔍 Fetching Staking Overview from Smart Contract...
✅ Smart Contract initialized successfully
📍 Contract Address: 0xd33e9676463597AfFF5bB829796836631F4e2f1f
🌐 Network: Holesky Testnet

📊 STAKING OVERVIEW RESULTS:
════════════════════════════════════════
💰 Total ETH Deposited: 100.5 ETH
🔒 Total ETH Staked: 85.3 ETH
👥 Total Stakers: 42
📈 Average Stake Amount: 2.03 ETH
════════════════════════════════════════
```

### Leaderboard Console Output:
```
🏆 Fetching Leaderboard from Smart Contract...
✅ Smart Contract initialized successfully
📍 Contract Address: 0xd33e9676463597AfFF5bB829796836631F4e2f1f
🌐 Network: Holesky Testnet

🏆 LEADERBOARD RESULTS:
════════════════════════════════════════════════════════════════
#1 | Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
    💎 Staked: 25.5 ETH | Share: 29.89%
────────────────────────────────────────────────────────────────
#2 | Address: 0x1234567890abcdef1234567890abcdef12345678
    💎 Staked: 15.2 ETH | Share: 17.82%
────────────────────────────────────────────────────────────────
```

---

## Technology Stack

- **Backend Framework:** Express.js
- **Blockchain Library:** ethers.js v6
- **Smart Contract:** Solidity (StakingDashboard)
- **Network:** Ethereum Holesky Testnet
- **Error Handling:** Custom asyncErrorHandler middleware

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables (Optional)

The API has default values hardcoded, but you can override them in your `.env` file:

```env
# Web3 / Blockchain Configuration
HOLESKY_RPC_URL=https://ethereum-holesky-rpc.publicnode.com
STAKING_DASHBOARD_ADDRESS=0xd33e9676463597AfFF5bB829796836631F4e2f1f
DETH_ADDRESS=0x520d7dAB4A5bCE6ceA323470dbffCea14b78253a
SETH_ADDRESS=0x16b0cD88e546a90DbE380A63EbfcB487A9A05D8e
GOVERNANCE_ADDRESS=0xD396FE92075716598FAC875D12E708622339FA3e
```

### 3. Run the Server
```bash
# Run backend only
npm run backend

# Or run full stack (backend + frontend)
npm run dev
```

The API will be available at: `http://localhost:4000`

---

## Testing

### Using cURL:
```bash
# Test staking overview
curl http://localhost:4000/api/v1/osmelpteran/staking-overview

# Test leaderboard
curl http://localhost:4000/api/v1/osmelpteran/leaderboard

# Test contract info
curl http://localhost:4000/api/v1/osmelpteran/contract-info
```

### Using Postman or Thunder Client:
1. Import the collection with the base URL
2. Test each endpoint individually
3. Check the console for detailed logs

---

## File Structure

```
backend/
├── controllers/
│   └── osmelPTeranApitestController.js  # Main controller with Web3 logic
├── routes/
│   └── osmelPTeranApitestRoute.js       # API route definitions
├── config/
│   ├── env.js                           # Environment configuration
│   └── config.env.example               # Example env file
└── app.js                               # Express app with route registration
```

---

## Smart Contract Functions Used

### getStakingOverview()
Returns comprehensive staking statistics:
- Total ETH deposited
- Total ETH staked
- Total number of stakers
- Average stake amount per staker

### getLeaderboard(uint256 count)
Returns top stakers:
- Array of staker addresses
- Array of staked amounts
- Array of percentage shares

---

## Error Handling

The API uses Express error handling middleware to catch and format errors:

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common Errors:**
- 500: Smart contract connection failed
- 500: Failed to fetch data from blockchain
- 500: Invalid contract address or ABI

---

## Notes

- All amounts are returned in ETH (not Wei)
- Percentages are returned with 2 decimal precision
- Console logs use emojis for better readability
- The API is read-only (no state-changing transactions)
- No authentication required for these endpoints

---

## Author

**Osmel P. Teran**  
Smart Contract API Integration Test  
Created: 2025

