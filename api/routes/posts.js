const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const postController = require("../controllers/postController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/post/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
}).single("picture");

// Create a Post
router.post("/", [upload], postController.addPost);

// Update a Post
router.put("/:id", postController.editPost);

// Delete a Post
router.delete("/:id", postController.deletePost);

// Like and Dislike a Post
router.put("/:id/like", postController.postLikeHandler);

// Get a Post By id
router.get("/:id", postController.getPostById);

// Get Timeline Posts
router.get("/timeline/:userId", postController.getTimelinePosts);

// Get User's All Posts
router.get("/profile/:username", postController.getUserAllPosts);

module.exports = router;
