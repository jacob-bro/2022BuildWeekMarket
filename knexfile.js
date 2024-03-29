
 const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' }, 
}


module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/market.db3' },
    seeds: { directory: './data/seeds' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/test.db3' },
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};