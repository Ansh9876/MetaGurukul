const express = require("express");
const { createBundle, getBundles, deleteBundle, updateBundle } = require("../controllers/bundleController");

const router = express.Router();

router.post("/", createBundle);
router.get("/", getBundles);
router.delete("/:id", deleteBundle);
router.put("/:id",updateBundle);
module.exports = router;
