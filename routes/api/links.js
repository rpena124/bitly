const express = require("express");
const router = express.Router();
const {
  dataController,
  apiController,
} = require("../../controllers/api/links");

// GET: Index api/links ( )
router.get("/", dataController.index, apiController.index);
// DELETE
router.delete("/:id", dataController.destroy, apiController.show);
// Create /api/links
router.post("/", dataController.create, apiController.show);
// Put
router.put("/:id", dataController.update, apiController.show);
// Show: Get /api/links/:id
router.get("/:id", dataController.show, apiController.show);

// Pass in the user ID
router.post(
  "/:userId",
  dataController.createLinkForLoggedInUser,
  apiController.show
);

module.exports = router;
