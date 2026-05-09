const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.post("/sign-up", indexController.signUpPost);
indexRouter.post("/log-in", indexController.logInPost);
indexRouter.get("/log-out", indexController.logOutPost);
indexRouter.get("/member", indexController.memberGet);
indexRouter.post("/member", indexController.memberPost);
indexRouter.get("/admin", indexController.adminGet);
indexRouter.post("/admin", indexController.adminPost);
indexRouter.get("/createPost", indexController.createPostGet);
indexRouter.post("/createPost", indexController.createPostPost);

module.exports = indexRouter;
