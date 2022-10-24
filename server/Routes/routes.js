const userRoute = require("./userRoute")
const postRoute = require("./postRoute")
const commentRoute = require("./commentRoute")

module.exports = app => {
  app.use(
    userRoute,
    postRoute,
    commentRoute
  )
}
