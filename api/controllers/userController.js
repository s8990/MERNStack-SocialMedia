const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

// Update User
const editUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // If User Inserted Password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json({ data: { error: error } });
      }
    }
    // Update User
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ data: { message: user } });
    } catch (error) {
      return res.status(500).json({ data: { error: error } });
    }
  } else {
    return res
      .status(403)
      .json({ data: { error: "You can update only your account" } });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // Delete User
    try {
      const user = await UserModel.findByIdAndDelete({ _id: req.params.id });
      res
        .status(200)
        .json({ data: { message: "Account has boon deleted successfully" } });
    } catch (error) {
      return res.status(500).json({ data: { error: error } });
    }
  } else {
    return res
      .status(403)
      .json({ data: { error: "You can delete only your account" } });
  }
};

// Get a User
// req.query ==> url?userId=example&username=example
const getOneUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    const { password, updatedAt, isAdmin, ...data } = user._doc;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

const getFriends = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendsList);
  } catch (error) {
    res.status(500).json(err);
  }
};

// Follow a User
const followOneUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await UserModel.findById(req.params.id);
        const currentUser = await UserModel.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({
            $push: { followings: req.params.id },
          });
          res.status(200).json("user has been followed");
        } else {
          res
            .status(404)
            .json({ data: { error: "you already follow this user" } });
        }
      } catch (error) {
        res.status(500).json({ data: { error: error } });
      }
    } else {
      res.status(403).json({ data: { error: "you cant follow yourself!" } });
    }
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

// UnFollow a User
const unFollowOneUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await UserModel.findById(req.params.id);
        const currentUser = await UserModel.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({
            $pull: { followings: req.params.id },
          });
          res.status(200).json("user has been unfollowed");
        } else {
          res
            .status(404)
            .json({ data: { error: "you already not follow this user" } });
        }
      } catch (error) {
        res.status(500).json({ data: { error: error } });
      }
    } else {
      res.status(403).json({ data: { error: "you cant unfollow yourself!" } });
    }
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

module.exports = {
  editUser,
  deleteUser,
  getOneUser,
  getFriends,
  followOneUser,
  unFollowOneUser,
};
