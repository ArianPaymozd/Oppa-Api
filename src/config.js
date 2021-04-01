module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://krotaouriyodsz:fca5929acf6ef771b799b295590ae0704daf941b990aa8a5bbccef7857ae4012@ec2-54-196-33-23.compute-1.amazonaws.com:5432/dc5ao6vcud02hs',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}