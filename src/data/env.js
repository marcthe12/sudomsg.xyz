const { env } = require("process")

module.exports = {
    isdevel: env.NODE_ENV == "develoment",
    env: env
}