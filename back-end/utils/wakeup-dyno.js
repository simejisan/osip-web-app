const fetch = require('node-fetch');

const wakeUpDyno = (url, interval = 25, callback) => {
    const milliseconds = interval * 60000;

    setTimeout(() => {
        try {
            // Set timeout called
            fetch(url).then(() => console.log("Fetching ${url}"))

        } catch (e) {
            console.log("Error fetching ${url}: ${err.message}. Will try again in ${interval} minute");
        } finally {
            try {
                // If passed, execute callback
                callback();
            } catch (e) {
                callback ? console.log("Callback fail: ", e.message) : null;
            } finally {
                // do it again
                return wakeUpDyno(url, interval, callback);
            }
        }
    }, milliseconds);
}

module.exports = wakeUpDyno;