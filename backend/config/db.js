import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

// Create connection pool with enhanced configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    // Add SSL configuration if needed (for production)
    // ssl: process.env.DB_SSL === 'true' ? {
    //     rejectUnauthorized: true,
    //     ca: process.env.DB_SSL_CA
    // } : undefined
});

// Connection lifecycle event handlers
pool.on('connection', (connection) => {
    console.log(`New connection established (ID: ${connection.threadId})`);
});

pool.on('acquire', (connection) => {
    console.debug(`Connection acquired (ID: ${connection.threadId})`);
});

pool.on('release', (connection) => {
    console.debug(`Connection released (ID: ${connection.threadId})`);
});

pool.on('enqueue', () => {
    console.warn('Waiting for available connection slot...');
});

// Test connection during startup
async function testConnection() {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.ping();
        console.log('✅ Database connection test successful');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        // Rethrow to prevent app from starting if DB is unreachable
        throw err;
    } finally {
        if (connection) connection.release();
    }
}

// Execute connection test immediately
// (Wrap in IIFE for top-level await alternative)
(async () => {
    try {
        await testConnection();
    } catch (err) {
        process.exit(1); // Exit with error code if DB connection fails
    }
})();

// Graceful shutdown handler
process.on('SIGINT', async () => {
    try {
        await pool.end();
        console.log('Database pool closed gracefully');
        process.exit(0);
    } catch (err) {
        console.error('Error closing database pool:', err);
        process.exit(1);
    }
});

export default pool;