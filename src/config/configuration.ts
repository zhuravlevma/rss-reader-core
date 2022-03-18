export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: Boolean(process.env.DATABASE_LOGGING),
    synchronize: Boolean(process.env.DATABASE_SYNCHRON),
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
