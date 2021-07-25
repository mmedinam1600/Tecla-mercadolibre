
const rateLimit = require("express-rate-limit");
const config = require('../config/config.json');

const limiter = rateLimit({
    windowMs: config.limiter.minutes * 60 * 1000,
    max: config.limiter.max,
    message: config.limiter.message
});

module.exports = {
    limiter
}



