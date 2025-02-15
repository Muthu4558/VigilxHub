import express from "express";
import { isAdminRoute, isSuperAdminRoute, protectRoute } from "../middlewares/authmiddlewave.js";
import {
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotificationsList,
  getTeamList,
  getUserDetails,
  getUserTasks,
  loginUser,
  logoutUser,
  markNotificationRead,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser, isAdminRoute, isSuperAdminRoute);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);
// Route to fetch tasks for a particular user
router.get("/:userId/tasks", getUserTasks);
router.get("/:userId", getUserDetails);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

// //   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;