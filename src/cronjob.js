import cron from 'node-cron';
import login from './login.js'

// Schedule tasks to be run on the server.
cron.schedule('*/4 * * * *', function() {
    console.log('running a task every 4 minute');
    login();
});