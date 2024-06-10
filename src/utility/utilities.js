import { appendFile } from 'fs';

const logFileName = 'activityMonitor.log';

export function writeToLogFile(message) {

    const now = new Date().toISOString();
    const logMessage = `${now} : ${message}\n`;

    appendFile(logFileName, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}