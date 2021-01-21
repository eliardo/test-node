module.exports = {
    dbHost: process.env.POSTGRES_HOST || 'localhost',
    dbPort: process.env.POSTGRES_PORT || '5432',
    dbUser: process.env.POSTGRES_USER || 'postgres',
    dbPass: process.env.POSTGRES_PASS || 'mypass',
    database: process.env.POSTGRES_DB || 'node_db'
  };