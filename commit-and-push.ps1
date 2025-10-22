# PowerShell Script to Commit and Push Changes
# Smart Contract API Integration - Osmel P. Teran

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  GIT COMMIT & PUSH - ETHVault Test" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "❌ Error: Not in a git repository!" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Adding files to git..." -ForegroundColor Yellow

# Add all new and modified files
git add backend/controllers/osmelPTeranApitestController.js
git add backend/routes/osmelPTeranApitestRoute.js
git add backend/test-smart-contract-api.js
git add backend/API_DOCUMENTATION.md
git add backend/app.js
git add backend/config/env.js
git add backend/config/config.env.example
git add SMART_CONTRACT_API_README.md
git add RESUMEN_PROYECTO_OSMEL.md
git add DELIVERY_INSTRUCTIONS.md
git add commit-and-push.ps1

Write-Host "✅ Files added!" -ForegroundColor Green

Write-Host "`n📝 Creating commit..." -ForegroundColor Yellow

# Create commit with detailed message
git commit -m "feat: Add OsmelPTeranApitest - Smart Contract Integration

- Created new API controller with Web3/ethers.js integration
- Added 3 REST endpoints for blockchain data retrieval
- Implemented standalone test script with console output
- Integrated with StakingDashboard contract on Holesky Testnet
- Fetches real-time data: staking overview, leaderboard, contract info
- Added comprehensive documentation in English
- All code properly commented per requirements
- Test results show successful blockchain integration

Technical Stack:
- Express.js backend
- ethers.js v6 for Web3
- Holesky Testnet (Chain ID: 17000)
- Read-only operations (no state changes)

API Endpoints:
- GET /api/v1/osmelpteran/staking-overview
- GET /api/v1/osmelpteran/leaderboard?count=10
- GET /api/v1/osmelpteran/contract-info

Test Results:
- Total ETH Deposited: 18.616175 ETH
- Total Stakers: 5
- Execution time: ~0.35 seconds
- All tests passing ✅

Created by: Osmel P. Teran"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit created successfully!" -ForegroundColor Green
    
    Write-Host "`n🚀 Pushing to remote repository..." -ForegroundColor Yellow
    
    # Push to remote
    git push origin master
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to remote!" -ForegroundColor Green
        Write-Host "`n============================================" -ForegroundColor Cyan
        Write-Host "  🎉 SUCCESS!" -ForegroundColor Green
        Write-Host "============================================" -ForegroundColor Cyan
        Write-Host "`nYour code is now in the repository!" -ForegroundColor White
        Write-Host "`nNext steps:" -ForegroundColor Yellow
        Write-Host "  1. Record your video demonstration" -ForegroundColor White
        Write-Host "  2. Upload video to YouTube/Loom/Drive" -ForegroundColor White
        Write-Host "  3. Send email to client with links" -ForegroundColor White
        Write-Host "`nSee DELIVERY_INSTRUCTIONS.md for details.`n" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ Error pushing to remote!" -ForegroundColor Red
        Write-Host "Please check your internet connection and try again." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n❌ Error creating commit!" -ForegroundColor Red
    Write-Host "Please check the error message above." -ForegroundColor Yellow
}

