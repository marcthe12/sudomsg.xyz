const { env } = require("process")

module.exports = () => {
  return {
    isdevel: env.NODE_ENV == "develoment",
    env: env
  }
}