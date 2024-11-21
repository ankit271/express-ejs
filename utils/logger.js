const fs = require('fs').promises; 

async function logger(userid, error, source) {
    try {
        await fs.appendFile(
            './error_log/log.txt',
            `${userid} - ${getFormattedDate()} - ${source} - ${error}\n` 
        );
    } catch (error) {
        console.log(error);
    }
}

function getFormattedDate() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-IN', { hour12: false });
    return `${day}-${monthName}-${year}:${time}`;
}


module.exports = {logger,getFormattedDate}; 
