import { exec } from 'child_process';
import { platform as _platform } from 'os';
import { writeToLogFile } from './utility/utilities.js';

function getMostCPUIntensiveProcess(callback) {
    let command = '';
    let platform = _platform();

    if (platform === 'win') {
        command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
    } else if (platform === 'darwin') {
        command = `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
    } else if (platform === 'linux') {
        command = `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
    } else {
        const error = 'Unsupported platform: ' + platform;
        callback(error, null);
        return;
    }

    exec(command, { encoding: 'utf-8' }, (error, stdout, stderr) => {
        if (error) {
            callback(error, null);
            return;
        }

        const lines = stdout.trim().split('\n');
        const [cpuUsage, memoryUsage, processName] = lines[0].split(/\s+/);
        const processInfo = `${processName} (CPU: ${cpuUsage}, Memory: ${memoryUsage})`;
        callback(null, processInfo);
    });
}

function displayAndLogProcessInfo() {
    getMostCPUIntensiveProcess((error, processInfo) => {
        if (error) {
            console.error('Error getting process info:', error);
            return;
        }
        console.clear();
        console.log(processInfo);
    });
}

/**
 * To refresh data ten times per second
 */
setInterval(displayAndLogProcessInfo, 100);

/**
 * Once per minute append the data to the log file
 */
setInterval(() => {
    getMostCPUIntensiveProcess((error, processInfo) => {
        if (error) {
            console.error('Error getting process info:', error);
            return;
        }
        writeToLogFile(processInfo);
    });
}, 60000);
