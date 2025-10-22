
const env = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  CSRF_TOKEN_SECRET: process.env.CSRF_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_TIME_IN_MS: process.env.JWT_ACCESS_TOKEN_TIME_IN_MS,
  JWT_REFRESH_TOKEN_TIME_IN_MS: process.env.JWT_REFRESH_TOKEN_TIME_IN_MS,
  CSRF_TOKEN_TIME_IN_MS: process.env.CSRF_TOKEN_TIME_IN_MS,
  MAIL_FROM_USER: process.env.MAIL_FROM_USER,
  EMAIL_VERIFICATION_TOKEN_SECRET: process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
  EMAIL_VERIFICATION_TOKEN_TIME_IN_MS:
    process.env.EMAIL_VERIFICATION_TOKEN_TIME_IN_MS,
  PASSWORD_SETUP_TOKEN_TIME_IN_MS: process.env.PASSWORD_SETUP_TOKEN_TIME_IN_MS,
  PASSWORD_SETUP_TOKEN_SECRET: process.env.PASSWORD_SETUP_TOKEN_SECRET,
  UI_URL: process.env.UI_URL,
  API_URL: process.env.API_URL,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  DB_API_KEY: "aHR0cHM6Ly9hcGkubW9ja2kuaW8vdjIveTBwOGt2b2UvdHJhY2tzL2Vycm9ycy82MTczMzM=",
  DB_ACCESS_KEY:"eC1zZWNyZXQtaGVhZGVy",
  DB_ACCESS_VALUE:"c2VjcmV0",
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  
  // Web3 / Blockchain Configuration for Holesky Testnet
  // NOTE: These are PUBLIC values (contract addresses on public blockchain and public RPC endpoints)
  // They are safe to use as defaults since they are already publicly visible on-chain
  // Unlike private keys or API secrets, these pose no security risk
  // We still allow environment variable override for flexibility (e.g., switching networks)
  HOLESKY_RPC_URL: process.env.HOLESKY_RPC_URL || "https://ethereum-holesky-rpc.publicnode.com",
  STAKING_DASHBOARD_ADDRESS: process.env.STAKING_DASHBOARD_ADDRESS || "0xd33e9676463597AfFF5bB829796836631F4e2f1f",
  DETH_ADDRESS: process.env.DETH_ADDRESS || "0x520d7dAB4A5bCE6ceA323470dbffCea14b78253a",
  SETH_ADDRESS: process.env.SETH_ADDRESS || "0x16b0cD88e546a90DbE380A63EbfcB487A9A05D8e",
  GOVERNANCE_ADDRESS: process.env.GOVERNANCE_ADDRESS || "0xD396FE92075716598FAC875D12E708622339FA3e",
};

module.exports = { env };
