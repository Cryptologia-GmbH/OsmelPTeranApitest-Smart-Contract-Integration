const express = require("express");
const {
  getStakingOverview,
  getLeaderboard,
  getContractInfo,
} = require("../controllers/osmelPTeranApitestController");

const router = express.Router();

/**
 * Smart Contract API Routes
 * Created by: Osmel P. Teran
 * Purpose: Fetch blockchain data from StakingDashboard smart contract on Holesky Testnet
 */

// Get comprehensive staking statistics
router.route("/staking-overview").get(getStakingOverview);

// Get top stakers leaderboard (optional query param: ?count=10)
router.route("/leaderboard").get(getLeaderboard);

// Get contract and network information
router.route("/contract-info").get(getContractInfo);

module.exports = router;

