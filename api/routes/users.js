const router = require("express").Router();

const userController = require("../controllers/userController");

// Update User
router.put("/:id", userController.editUser);

// Delete User
router.delete("/:id", userController.deleteUser);

// Get a User
// req.query ==> url?userId=example&username=example
router.get("/", userController.getOneUser);

// get friends
router.get("/friends/:userId", userController.getFriends);

// Follow a User
router.put("/:id/follow", userController.followOneUser);

// UnFollow a User
router.put("/:id/unfollow", userController.unFollowOneUser);

module.exports = router;
