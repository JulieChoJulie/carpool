const path = require('path');
const { spawn } = require('child-process-promise');
const spawnOptions = { stdio: 'inherit' };

(async () => {
    try {
        // Migrate the DB
        await spawn('sequelize', ['db:migrate'], spawnOptions);
        console.log('*************************');
        console.log('Migration successful');
    } catch (err) {
        // Oh no!
        console.log('*************************');
        console.log('Migration failed. Error:', err.message);
        process.exit(1);
    }
    process.exit(0);
})();
