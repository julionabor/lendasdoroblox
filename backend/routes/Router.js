const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

// test route
router.get("/", (req, res) => {
	res.send("API Working!");
	console.log(res)
});

module.exports = router;
